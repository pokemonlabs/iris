import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Modal, Upload } from 'antd';
import { useState } from 'react';
import { Api } from '~/core/trpc';

const { TextArea } = Input;

const AddTestStepModal = ({ visible, onClose, testRunId }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const { mutateAsync: addTestSteps, isLoading: isLoadingAddTestStep } = Api.testStep.createMany.useMutation();
  // const { mutateAsync: updateTest } = Api.testRun.update.useMutation();

  // Add a button where I can click to mark the test as complete.
  // const result = await updateTest({
  //   "where": {
  //     "id": testRunId
  //   },
  //   "data": {
  //     "status": "SUCCESS"
  //   }
  // })

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      // Call the API to submit the test step
      await addTestSteps({
        data: [{
          "action": values.action,
          "order": values.order,
          "screenshotUrl": fileList[0]?.url,
          "status": values.status,
          "testRunId": testRunId
        }],
      });

      // Reset the form and file list
      form.resetFields();
      setFileList([]);

      // Close the modal
      onClose();
    } catch (error) {
      console.error('Error adding test step:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);

    // Close the modal
    onClose();
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <Modal
      title="Add Test Step"
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk} loading={isLoadingAddTestStep}>
          Submit
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          order: 1,
          action: '',
          status: '',
        }}
      >
        <Form.Item
          name="order"
          label="Order"
          rules={[{ required: true, message: 'Please input the order of the test step!' }]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item
          name="action"
          label="Action"
          rules={[{ required: true, message: 'Please input the action of the test step!' }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: 'Please input the status of the test step!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Screenshot">
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76" // Replace with your actual upload URL
            listType="picture"
            fileList={fileList}
            onChange={handleUploadChange}
            beforeUpload={() => false} // Prevent automatic upload
          >
            {fileList.length === 0 && (
              <Button icon={<UploadOutlined />}>Upload Screenshot</Button>
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTestStepModal;