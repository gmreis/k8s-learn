Service that returns only the status code. The response behavior can be:
- 10% will return 404 statuses
- 5% will return 200 status with a 1 second delay
- 5% does not respond.
- 80% will return 200 status.

The exposed door is 4567 and for services to talk, use the mock-url domain.
Example: http://mock-url:4567/something
