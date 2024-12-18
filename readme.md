
# WaveData
### How it works
WaveData connects people who want to help with medical researchers who need data. The biggest difference with existing platforms is that we approach the problem fromt the side of the people who want to help cure a disease. WaveData has 2 roles: Organizer and users/patients.

With the WaveData marketplace the organizer can create their studies and surveys and set the questions, rewards etc. With the WaveData app, peoople can download a user-friendly app to survey and join studies.

WaveData helps each user and organizer to keep touch everyday. On WaveData the organizer can check how many people have contributed and what their answers are. WaveData provides chart analysis options for the organizer to keep updated with better understanding.

For wavedata, we are using Hedera to store user's details, study details, Rewards details (for each Study), Survey, Audiences, Contributors and retirieving those in our website.


### Development
Wavedata is made using React js. We are using hashconnect and @hashgraph/sdk to connect with Hashpack wallet. We are using Hedera testnet network. We have made our smart contract into solidity language. Then using hardhat we have deployed using hedera mirror/hashio rpc url. In order to avoid view functions query fees, we are using ether.js. And then for the send transaction we are using @hashgraph/sdk or Hashpack wallet.

1. Soldity Smart contract written in [WaveData.sol](./wavedata/src/contracts/contracts/WaveData.sol)
2. Hardhat deploying  js file written in [deploy.js](./wavedata/src/contracts/deploy/deploy.js) and [hardhat.config.js](./wavedata/src/contracts/hardhat.config.js) 
3. We have used Hashconnect client in [hashconnect-client.js](./wavedata/src/contextx/hashconnect-client.js)
4. We have used [hashconnect.js](./wavedata/src/services/hashconnect.js) 
5. We have used redux storing hashpack accounts in [store.js](./wavedata/src/services/store.js)
6. We have used Etherjs contract to avoid view functions call gas fee in [useContract.js](./wavedata/src/services/useContract.js)
7. We have used Connect Wallet in [Login page](./wavedata/src/pages/LogIn.js)
8. We have used Connect Wallet in [Register page](./wavedata/src/pages/Register.js)
9. We are retrieving View functions using usecontract.js. example : [LoadData()](./wavedata/src/pages/Study.js)
10. We are using [CreateStudy](./wavedata/src/components/modal/CreateStudy.jsx), [CreateSurvey](./wavedata/src/components/modal/CreateSurvey.jsx), [UpdateStudy](./wavedata/src/components/modal/UpdateStudy.jsx), [UpdateSurvey](./wavedata/src/components/modal/UpdateSurvey.jsx) for send transaction.  

## WaveData App (Development)
Wavedata App is made using flutter. We are using wavedata-api for making connection between hedera network and wavedata flutter app. 




## WaveData Api (Development)
Wavedata Api is made using nextjs. We have depolyed it into vercel. Then we are using it's url to wavedata app. In the api, we are using a derieved privatekey for making transaction. Also we are using ether.js here for viewing functions.


# Instructions

### To run Website:
1. Go to wavedata folder
2. if you haven't installed nodejs. Then you have to first install node js. Link of download  https://nodejs.org/en/download/
3. Then run 'npm install' in that wavedata folder.
4. Then run 'npm run build'. 
5. Next you have to 'npm run dev' to run locally. Then, you can test the website at http://localhost:3000/


### To run app:
1. Go to wavedata-app folder.
2. Now you have to install flutter. https://docs.flutter.dev/get-started/install
3. When you have done setup with Flutter, then you can run 'flutter run -d chrome'. It will open a chrome browser and it will be localhost. There you can test the app.

### To run Website Api:
1. Go to wavedata-api folder
2. if you haven't installed nodejs. Then you have to first install node js. Link of download  https://nodejs.org/en/download/
3. Then run 'npm install' in that wavedata-api folder.
4. Then run 'npm run build'. 
5. Next you have to 'npm run dev' to run locally. Then, you can test the website at http://localhost:3000/

# Test:
### Website
https://wavedata-hedera.vercel.app/
### App
https://wavedata-hedera-app.vercel.app/
