// var admin=require("firebase-admin");

// var serviceAccount=require("/Users/Intern/Desktop/LunchOut/LunchOut/lunch-out-firebase-adminsdk-nnu70-628677329b.json");

// admin.initializeApp({
//     credential:admin.credential.cert(serviceAccount),
//     databaseUrl:"https://lunch-out.firebaseio.com/"
// });

// var registrationToken="AAAAb65H_5Q:APA91bExIUrDvUirUuiXQx4lhXodNVvMVz9L35XcFNqCidr4ayXWWSxxlc94LsAxBYlXZNuuvZgUwWt9k9--OOQ25oWudRs_31yTRphUc7-ZjJ3fw0cyL1rJdUQQm9zPPqAjRwY0oAwy";

// var payload={
//     data:{
//         MyKey1: "Hello"
//     }
// };
// var options={
//     priority:"high",
//     timeToLive:60*60*24
// };

// admin.messaging().sendToDevice(registrationToken,payload,options)
//     .then(function(response){
//         console.log("Succesfully sent mesage: ",response);
//     })
//     .catch(function(error){
//         console.log("Error sendind message: ", error);
//     });