
const admin = require('firebase-admin')
const serviceAccount =  require('./.secret.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://osake-d4cfe.firebaseio.com'
});

const db = admin.database();
const ref = db.ref('articles');


let paths = {}
//ref.once("value", function(snapshot) {
//  //console.log(snapshot.val());
//  const posts = await snapshot.val()
//  for(const key in posts) {
//    if(!posts[key].favos) {
//      paths[key + "/favos"] = 0
//      console.log('paths', paths)
//    }
//  }
//});


//https://firebase.googleblog.com/2016/01/keeping-our-promises-and-callbacks_76.html

//ref.onceはpromiseを返す
//非同期で読み取るんだね

ref.once("value").then(function(snapshot) {
  //console.log(snapshot.val());
  const posts = snapshot.val()
  for(const key in posts) {
    if(!posts[key].favos) {
      paths[key + "/favos"] = 0
      console.log('paths', paths)
    }
  }
  ref.update(paths)
});




console.log('end')