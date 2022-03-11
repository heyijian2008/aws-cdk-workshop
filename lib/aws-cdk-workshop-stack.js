"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsCdkWorkshopStack = void 0;
const cdk = require("@aws-cdk/core");
const lambda = require("@aws-cdk/aws-lambda");
const apigw = require("@aws-cdk/aws-apigateway");
const hitcounter_1 = require("./hitcounter");
const cdk_dynamo_table_viewer_1 = require("cdk-dynamo-table-viewer");
class AwsCdkWorkshopStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const hello = new lambda.Function(this, 'HelloHandler', {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'hello.handler'
        });
        const helloWithCounter = new hitcounter_1.HitCounter(this, 'HelloHitCounter', {
            downstream: hello
        });
        // defines an API Gateway REST API resource backed by our "hello" function.
        const myapigw = new apigw.LambdaRestApi(this, 'Endpoint', {
            handler: helloWithCounter.handler
        });
        const myTableViewer = new cdk_dynamo_table_viewer_1.TableViewer(this, 'ViewHitCounter', {
            title: 'Heyijian2008 Hits',
            table: helloWithCounter.table,
            sortBy: 'hits'
        });
    }
}
exports.AwsCdkWorkshopStack = AwsCdkWorkshopStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLWNkay13b3Jrc2hvcC1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF3cy1jZGstd29ya3Nob3Atc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQXFDO0FBQ3JDLDhDQUE4QztBQUM5QyxpREFBaUQ7QUFDakQsNkNBQTBDO0FBQzFDLHFFQUFzRDtBQUV0RCxNQUFhLG1CQUFvQixTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQ2hELFlBQVksS0FBYyxFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUM1RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRTtZQUN0RCxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7WUFDckMsT0FBTyxFQUFFLGVBQWU7U0FDekIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLHVCQUFVLENBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFO1lBQy9ELFVBQVUsRUFBRSxLQUFLO1NBQ2xCLENBQUMsQ0FBQztRQUVILDJFQUEyRTtRQUMzRSxNQUFNLE9BQU8sR0FBRyxJQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRTtZQUN4RCxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsT0FBTztTQUNsQyxDQUFDLENBQUM7UUFFSCxNQUFNLGFBQWEsR0FBRyxJQUFJLHFDQUFXLENBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFO1lBQzVELEtBQUssRUFBRSxtQkFBbUI7WUFDMUIsS0FBSyxFQUFFLGdCQUFnQixDQUFDLEtBQUs7WUFDN0IsTUFBTSxFQUFFLE1BQU07U0FDZixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUF6QkQsa0RBeUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xyXG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSAnQGF3cy1jZGsvYXdzLWxhbWJkYSc7XHJcbmltcG9ydCAqIGFzIGFwaWd3IGZyb20gJ0Bhd3MtY2RrL2F3cy1hcGlnYXRld2F5JztcclxuaW1wb3J0IHsgSGl0Q291bnRlciB9IGZyb20gJy4vaGl0Y291bnRlcic7XHJcbmltcG9ydCB7IFRhYmxlVmlld2VyIH0gZnJvbSAnY2RrLWR5bmFtby10YWJsZS12aWV3ZXInO1xyXG5cclxuZXhwb3J0IGNsYXNzIEF3c0Nka1dvcmtzaG9wU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xyXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQXBwLCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XHJcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcclxuXHJcbiAgICBjb25zdCBoZWxsbyA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgJ0hlbGxvSGFuZGxlcicsIHtcclxuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzE0X1gsXHJcbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldCgnbGFtYmRhJyksXHJcbiAgICAgIGhhbmRsZXI6ICdoZWxsby5oYW5kbGVyJ1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgaGVsbG9XaXRoQ291bnRlciA9IG5ldyBIaXRDb3VudGVyKHRoaXMsICdIZWxsb0hpdENvdW50ZXInLCB7XHJcbiAgICAgIGRvd25zdHJlYW06IGhlbGxvXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBkZWZpbmVzIGFuIEFQSSBHYXRld2F5IFJFU1QgQVBJIHJlc291cmNlIGJhY2tlZCBieSBvdXIgXCJoZWxsb1wiIGZ1bmN0aW9uLlxyXG4gICAgY29uc3QgbXlhcGlndyA9IG5ldyBhcGlndy5MYW1iZGFSZXN0QXBpKHRoaXMsICdFbmRwb2ludCcsIHtcclxuICAgICAgaGFuZGxlcjogaGVsbG9XaXRoQ291bnRlci5oYW5kbGVyXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBteVRhYmxlVmlld2VyID0gbmV3IFRhYmxlVmlld2VyKHRoaXMsICdWaWV3SGl0Q291bnRlcicsIHtcclxuICAgICAgdGl0bGU6ICdIZXlpamlhbjIwMDggSGl0cycsXHJcbiAgICAgIHRhYmxlOiBoZWxsb1dpdGhDb3VudGVyLnRhYmxlLFxyXG4gICAgICBzb3J0Qnk6ICdoaXRzJ1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==