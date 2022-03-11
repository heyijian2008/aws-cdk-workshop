"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HitCounter = void 0;
const cdk = require("@aws-cdk/core");
const lambda = require("@aws-cdk/aws-lambda");
const dynamodb = require("@aws-cdk/aws-dynamodb");
class HitCounter extends cdk.Construct {
    constructor(scope, id, props) {
        var _a;
        if (props.readCapacity !== undefined && (props.readCapacity < 5 || props.readCapacity > 20)) {
            throw new Error('readCapacity must be greater than 5 and less than 20');
        }
        super(scope, id);
        const table = new dynamodb.Table(this, 'Hits', {
            partitionKey: {
                name: 'path',
                type: dynamodb.AttributeType.STRING
            },
            encryption: dynamodb.TableEncryption.AWS_MANAGED,
            readCapacity: (_a = props.readCapacity) !== null && _a !== void 0 ? _a : 5
        });
        this.table = table;
        this.handler = new lambda.Function(this, 'HitCounterHandler', {
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: 'hitcounter.handler',
            code: lambda.Code.fromAsset('lambda'),
            environment: {
                DOWNSTREAM_FUNCTION_NAME: props.downstream.functionName,
                HITS_TABLE_NAME: table.tableName
            }
        });
        // grant the lambda role read/write permissions to our table
        table.grantReadWriteData(this.handler);
        // grant the lambda role invoke permissions to the downstream function
        props.downstream.grantInvoke(this.handler);
    }
}
exports.HitCounter = HitCounter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGl0Y291bnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhpdGNvdW50ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQXFDO0FBQ3JDLDhDQUE4QztBQUM5QyxrREFBa0Q7QUFnQmxELE1BQWEsVUFBVyxTQUFRLEdBQUcsQ0FBQyxTQUFTO0lBTzNDLFlBQVksS0FBb0IsRUFBRSxFQUFVLEVBQUUsS0FBc0I7O1FBRWxFLElBQUksS0FBSyxDQUFDLFlBQVksS0FBSyxTQUFTLElBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsWUFBWSxHQUFFLEVBQUUsQ0FBQyxFQUFFO1lBQ3pGLE1BQU0sSUFBSSxLQUFLLENBQUMsc0RBQXNELENBQUMsQ0FBQztTQUN6RTtRQUVELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsTUFBTSxLQUFLLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUU7WUFDM0MsWUFBWSxFQUFFO2dCQUNaLElBQUksRUFBRSxNQUFNO2dCQUNaLElBQUksRUFBRSxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU07YUFDcEM7WUFDRCxVQUFVLEVBQUUsUUFBUSxDQUFDLGVBQWUsQ0FBQyxXQUFXO1lBQ2hELFlBQVksUUFBRSxLQUFLLENBQUMsWUFBWSxtQ0FBSSxDQUFDO1NBQ3hDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBRW5CLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxtQkFBbUIsRUFBRTtZQUM1RCxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLE9BQU8sRUFBRSxvQkFBb0I7WUFDN0IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztZQUNyQyxXQUFXLEVBQUU7Z0JBQ1gsd0JBQXdCLEVBQUUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxZQUFZO2dCQUN2RCxlQUFlLEVBQUUsS0FBSyxDQUFDLFNBQVM7YUFDakM7U0FDRixDQUFDLENBQUM7UUFFSCw0REFBNEQ7UUFDNUQsS0FBSyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV2QyxzRUFBc0U7UUFDdEUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzdDLENBQUM7Q0FDRjtBQXpDRCxnQ0F5Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnQGF3cy1jZGsvY29yZSc7XHJcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tICdAYXdzLWNkay9hd3MtbGFtYmRhJztcclxuaW1wb3J0ICogYXMgZHluYW1vZGIgZnJvbSAnQGF3cy1jZGsvYXdzLWR5bmFtb2RiJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSGl0Q291bnRlclByb3BzIHtcclxuICAvKiogdGhlIGZ1bmN0aW9uIGZvciB3aGljaCB3ZSB3YW50IHRvIGNvdW50IHVybCBoaXRzICoqL1xyXG4gIGRvd25zdHJlYW06IGxhbWJkYS5JRnVuY3Rpb247XHJcbiAgXHJcbiAgLyoqXHJcbiAgICogVGhlIHJlYWQgY2FwYWNpdHkgdW5pdHMgZm9yIHRoZSB0YWJsZVxyXG4gICAqXHJcbiAgICogTXVzdCBiZSBncmVhdGVyIHRoYW4gNSBhbmQgbG93ZXIgdGhhbiAyMFxyXG4gICAqXHJcbiAgICogQGRlZmF1bHQgNVxyXG4gICAqL1xyXG4gICByZWFkQ2FwYWNpdHk/OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBIaXRDb3VudGVyIGV4dGVuZHMgY2RrLkNvbnN0cnVjdCB7XHJcblxyXG4gIC8qKiBhbGxvd3MgYWNjZXNzaW5nIHRoZSBjb3VudGVyIGZ1bmN0aW9uICovXHJcbiAgcHVibGljIHJlYWRvbmx5IGhhbmRsZXI6IGxhbWJkYS5GdW5jdGlvbjtcclxuXHJcbiAgcHVibGljIHJlYWRvbmx5IHRhYmxlOiBkeW5hbW9kYi5UYWJsZTtcclxuXHJcbiAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5Db25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBIaXRDb3VudGVyUHJvcHMpIHtcclxuICAgIFxyXG4gICAgaWYgKHByb3BzLnJlYWRDYXBhY2l0eSAhPT0gdW5kZWZpbmVkICYmKHByb3BzLnJlYWRDYXBhY2l0eSA8IDUgfHwgcHJvcHMucmVhZENhcGFjaXR5ID4yMCkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdyZWFkQ2FwYWNpdHkgbXVzdCBiZSBncmVhdGVyIHRoYW4gNSBhbmQgbGVzcyB0aGFuIDIwJyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHN1cGVyKHNjb3BlLCBpZCk7XHJcblxyXG4gICAgY29uc3QgdGFibGUgPSBuZXcgZHluYW1vZGIuVGFibGUodGhpcywgJ0hpdHMnLCB7XHJcbiAgICAgICAgcGFydGl0aW9uS2V5OiB7IFxyXG4gICAgICAgICAgbmFtZTogJ3BhdGgnLCBcclxuICAgICAgICAgIHR5cGU6IGR5bmFtb2RiLkF0dHJpYnV0ZVR5cGUuU1RSSU5HIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW5jcnlwdGlvbjogZHluYW1vZGIuVGFibGVFbmNyeXB0aW9uLkFXU19NQU5BR0VELFxyXG4gICAgICAgIHJlYWRDYXBhY2l0eTogcHJvcHMucmVhZENhcGFjaXR5ID8/IDVcclxuICAgIH0pO1xyXG4gICAgdGhpcy50YWJsZSA9IHRhYmxlO1xyXG5cclxuICAgIHRoaXMuaGFuZGxlciA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgJ0hpdENvdW50ZXJIYW5kbGVyJywge1xyXG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTRfWCxcclxuICAgICAgaGFuZGxlcjogJ2hpdGNvdW50ZXIuaGFuZGxlcicsXHJcbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldCgnbGFtYmRhJyksXHJcbiAgICAgIGVudmlyb25tZW50OiB7XHJcbiAgICAgICAgRE9XTlNUUkVBTV9GVU5DVElPTl9OQU1FOiBwcm9wcy5kb3duc3RyZWFtLmZ1bmN0aW9uTmFtZSxcclxuICAgICAgICBISVRTX1RBQkxFX05BTUU6IHRhYmxlLnRhYmxlTmFtZVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBncmFudCB0aGUgbGFtYmRhIHJvbGUgcmVhZC93cml0ZSBwZXJtaXNzaW9ucyB0byBvdXIgdGFibGVcclxuICAgIHRhYmxlLmdyYW50UmVhZFdyaXRlRGF0YSh0aGlzLmhhbmRsZXIpO1xyXG5cclxuICAgIC8vIGdyYW50IHRoZSBsYW1iZGEgcm9sZSBpbnZva2UgcGVybWlzc2lvbnMgdG8gdGhlIGRvd25zdHJlYW0gZnVuY3Rpb25cclxuICAgIHByb3BzLmRvd25zdHJlYW0uZ3JhbnRJbnZva2UodGhpcy5oYW5kbGVyKTtcclxuICB9XHJcbn1cclxuIl19