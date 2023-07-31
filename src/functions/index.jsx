
import { collection, query, where , getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import axios from 'axios';

export const SendNotif = async (title, message , warningtime) => {
  
    try {
      const serverKey = 'AAAA6yw0V8Q:APA91bEtCvykmd26k3UjjNfS9KfMmSmIrS837HBG4FzLWwVL7rnYjKYrIqFTzohzAZnojib68PdS-GJOI6FGr-KspFhj12JhKSalabXI7JoZCee_I7B9Gv7bmwyuM6Ds4bq6lGbZw4on';
      const fcmEndpoint = 'https://fcm.googleapis.com/fcm/send';
  
      const querySnapshot = await getDocs(collection(db, 'token'));
      querySnapshot.docs.forEach(async (doc) => {
        const tokens = querySnapshot.docs.map((doc) => doc.data());
        console.log(tokens[0].token); 
  
        const dataArr = tokens[0].token;
  
        const messages = {
          registration_ids: dataArr,
          notification: {
            title: title,
            body: message,
          },
          data: {
            warningtime: warningtime
          },
        };
  
        const response = await axios.post(fcmEndpoint, messages, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'key=' + serverKey,
          },
        });
  
        console.log('Notification sent successfully:', response.data);
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };
