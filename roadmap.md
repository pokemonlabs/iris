1. Integrate slack, jira, linear, discord [needs to be tested]
2. Create product animation videos
3. **Add landing page, and use tally.so to ask users to fill in their details, so we can reach out to them.**
  - App goes to app.Iris.com
  - Webpage remains on Iris.com
4. **Setup deployment**
5. **Add posthog analytics**
6. Rejoice


---



1. Check if we should use async browser 
2. send the url
3. open the url in the browser
4. then run the agent
5. last check parallellism


> Test the scenarios where tests would fail, and the agent should be able to log those too
> Get atleast one integration working, maybe just discord
> If you have time setup nango.dev on your own environment, so you can allow users to have tons of integrations
> Record a google video and post it on the dashboard
> Write and release product hunt and linkedin
> Also need to check mapping with workers, there might be duplicates, or socketify is not working
> Pray!



----


For slack for example, you need to write an integration endpoint that sends the payload for slack, discord etc... and then use nango to send the message to the right channel. You should be able to use the jwt token / whatever you used, to figure out who to send this message to.


You will still need to pass the schema to the agent, so it can pass it over to the proxy, that connects to nango.dev to send those messages.




Tool for websocket communication
Tool for screenshot
If stuck take a screenshot and ask user for additional instruction


How to initiate vnc and novnc from the worker




write a function call that triggers notification to the user, that the job is picked up. 
On this notification event, we can then connect to the vnc and novnc and start the job.
- can expose some environment variable, so nginx can route the request to the right container
- we can also use the user-data-dir so the user's state can be persisted between runs. use shared volume so each worker has knowledge of all user states

