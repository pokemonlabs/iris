// const stripe = require('stripe')(process.env.SERVER_PAYMENT_STRIPE_SECRET_KEY);
import { promises as fs } from 'fs';
import { basename } from 'path';
import { Stripe } from 'stripe';

const stripe = new Stripe(process.env.SERVER_PAYMENT_STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
});

// Constants for products
const PRODUCTS = {
  BASIC: {
    name: "Basic Plan",
    description: "Perfect for small teams and individual developers",
    features: ["500 test runs per month", "Basic support", "API access"],
    price_monthly: 2000, // in cents
    test_runs: 500,
    image_path: "images/basic.jpg",
    lookup_key: "basic_monthly",
    routes: "projects,agents,agent"
  },
  PREMIUM: {
    name: "Premium Plan",
    description: "Ideal for growing teams with higher testing needs",
    features: ["2750 test runs per month", "Priority support", "API access", "Advanced analytics"],
    price_monthly: 10000, // in cents
    test_runs: 2750, // ~550 tests per $20 with 5% volume discount
    image_path: "images/premium.jpg",
    lookup_key: "premium_monthly",
    routes: "projects,agents,agent"
  }
};

function checkStripeKeys() {
  if (!process.env.SERVER_PAYMENT_STRIPE_SECRET_KEY) {
    console.error('Error: Stripe secret key not found in environment variables.');
    process.exit(1);
  }
}

async function uploadProductImage(imagePath) {
  try {
    const fileBuffer = await fs.readFile(imagePath);
    const fileType = basename(imagePath).split('.').pop().toLowerCase();
    
    // Create form data for the file upload
    const file = await stripe.files.create({
      purpose: 'product_image',
      file: {
        data: fileBuffer,
        name: basename(imagePath),
        type: `image/${fileType}`,
      },
    });

    // Return the file URL
    return `https://files.stripe.com/v1/files/${file.id}`;
  } catch (error) {
    console.log(`Warning: Error uploading image at ${imagePath}:`, error.message);
    return null;
  }
}


async function createFileObject(imagePath) {
  try {
    const fileData = await fs.readFile(imagePath);
    const file = await stripe.files.create({
      purpose: 'business_icon',
      file: {
        data: fileData,
        name: basename(imagePath)
      },
    });
    return file.id;
  } catch (error) {
    console.log(`Warning: Error uploading image at ${imagePath}:`, error.message);
    return null;
  }
}

async function createOrUpdateProducts() {
  const createdProducts = {};

  for (const [productCode, productData] of Object.entries(PRODUCTS)) {
    try {
      // First, try to find existing product by lookup key
      const existingProducts = await stripe.products.search({
        query: `metadata['product_code']:'${productCode}' AND active:'true'`,
      });

      let product;
      let productParams = {
        name: productData.name,
        description: productData.description,
        metadata: {
          product_code: productCode,
          test_runs: productData.test_runs.toString(),
          features: productData.features.join(','),
          routes: productData.routes
        }
      };

      // Handle image upload
      if (productData.image_path) {
        try {
          await fs.access(productData.image_path);
          const imageUrl = await uploadProductImage(productData.image_path);
          if (imageUrl) {
            productParams.images = [imageUrl];
          }
        } catch (error) {
          console.log(`Warning: Image not found at ${productData.image_path}`);
        }
      }

      if (existingProducts.data.length > 0) {
        // Update existing product
        product = await stripe.products.update(
          existingProducts.data[0].id,
          productParams
        );
        console.log(`Updated existing product: ${productData.name}`);
      } else {
        // Create new product
        product = await stripe.products.create(productParams);
        console.log(`Created new product: ${productData.name}`);
      }

      // Price handling remains the same
      const existingPrices = await stripe.prices.search({
        query: `lookup_key:'${productData.lookup_key}' AND active:'true'`,
      });

      let price;
      if (existingPrices.data.length > 0) {
        const existingPrice = existingPrices.data[0];
        if (existingPrice.unit_amount !== productData.price_monthly) {
          await stripe.prices.update(existingPrice.id, { active: false });
          price = await stripe.prices.create({
            product: product.id,
            unit_amount: productData.price_monthly,
            currency: 'usd',
            recurring: { interval: 'month' },
            lookup_key: productData.lookup_key,
            transfer_lookup_key: true,
            metadata: {
              product_code: productCode
            }
          });
          console.log(`Created new price for ${productData.name}`);
        } else {
          price = existingPrice;
          console.log(`Using existing price for ${productData.name}`);
        }
      } else {
        price = await stripe.prices.create({
          product: product.id,
          unit_amount: productData.price_monthly,
          currency: 'usd',
          recurring: { interval: 'month' },
          lookup_key: productData.lookup_key,
          transfer_lookup_key: true,
          metadata: {
            product_code: productCode
          }
        });
        console.log(`Created new price for ${productData.name}`);
      }

      createdProducts[productCode] = {
        product_id: product.id,
        price_id: price.id
      };

    } catch (error) {
      console.error(`Error processing ${productData.name}:`, error.message);
    }
  }

  return createdProducts;
}

async function main() {
  try {
    checkStripeKeys();
    console.log('Starting product setup in Stripe...');
    const createdProducts = await createOrUpdateProducts();
    
    console.log('\nProduct setup complete!');
    console.log('\nCreated Products and Prices:');
    for (const [productCode, ids] of Object.entries(createdProducts)) {
      console.log(`\n${productCode}:`);
      console.log(`Product ID: ${ids.product_id}`);
      console.log(`Price ID: ${ids.price_id}`);
    }
  } catch (error) {
    console.error('Setup failed:', error.message);
  }
}

main();