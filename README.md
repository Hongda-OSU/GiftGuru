<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- ABOUT THE PROJECT -->

## About The Project

<p align="center" width="100%">
 <img width="33%" src="https://raw.githubusercontent.com/Hongda-OSU/PicGo-2.3.1/master/img183237.png" />
</p>

- Gift Guru is a gift-giving web application combining AI image recognization and Google Shopping API. 
- By uploading photos of your loved one enjoys, the AI analyzes the image and suggest the perfect, stress-free gift. 

### Built With

[![General badge](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://shields.io/) [![General badge](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://shields.io/) [![General badge](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://shields.io/) [![General badge](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://shields.io/) [![General badge](https://img.shields.io/badge/materialui-%230081CB.svg?style=for-the-badge&logo=material-ui&logoColor=white)](https://shields.io/) [![General badge](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://shields.io/) [![General badge](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)](https://shields.io/)

<!-- GETTING STARTED -->

## Getting Started

Here is an instruction of how you can set up this project locally.

### Front End

- First you need to clone the repo locally.

```
git clone https://github.com/394-w24/GiftGuru.git
```

- Then you need to install all the dependencies.
  - One of our dependency has conflict with react version, so you need to have the `--force` flag whenever you want to npm install

```
npm install --force
```

- Then you can run `npm run start` to see the web login page.

```
npm run start
```

### Back End

1. Important: The backend repo is here: https://github.com/394-w24/GiftGuruBE
   
2. Repeat all the above steps. But run `npm run dev` to start the backend locally on `localhost:3001`

```
git clone https://github.com/394-w24/GiftGuruBE

npm install

npm run dev
```

3. In order to run the backend, you need to create a `.env` file, you need to have 2 API key stored in this file
   - GEMINI_API_KEY = "" (Follow this link: https://ai.google.dev/) 
   - SERPAPI_API_KEY = "" (Follow this link: https://serpapi.com/ , only 100 free seaches per month!) 

<!-- USAGE EXAMPLES -->

## Continue Working

Important notes about hosting:

1. Fork the Project to your own repo.
2. The project is hosted using firebase. The authentication and sign-up logics is also down in firebase. However, if you want to continue work on this project, you cannot use our firebase. Follow the instruction in firebase and change the [file](https://github.com/394-w24/GiftGuru/blob/master/utilities/firebase.js) when you finished.
3. In order to have a working website on the internet, you have to host your backend, not locally! 


Important notes about app logics:

1. We use prompt in the [backend code ](https://github.com/394-w24/GiftGuruBE/blob/main/routes/gemini.js), you can change it to return more specific gift tags.
   - But there are limitations of what Gemini can return. It cannot recognize things that it don't know. (AI limitation)
2. Also, in the above file. You will noticed that we only let Gemini generate 6 tags from the image we input. You can change it.
3. We use the Google Shopping API wrapped by Serpapi to do the gift seaching. But there are some implementation details:
   - Be ware that there are only 100 free searches per account per month!
   - In the [frontend code](https://github.com/394-w24/GiftGuru/blob/master/src/components/homePage/homePage.jsx), line 170, you will noticed that we divide 6 tags into 3 groups, each with 2 tags and call the Google Shopping API. This will result in 3 searches per get recommendation. The reason why we do this is because it return better searching result. You can change here.
   
<!-- ISSUES -->

## Known Issues

1. The Homepage cannot save the local images uploaded, when you go back from the Recommendation page.

<!-- LICENSE -->

## License

Distributed under the MIT License.

<!-- CONTRIBUTORS -->

## Contributors

Super thanks to all the team members of Team Orange 💖
  - Hongda Lin, Zitao Cai, Yibo Chen, Josh Mahabir, Sung Park, Jim Wei, Anna Xiao

<!-- CONTACT -->

## Contact

- Hongda Lin: hongdalin2026@u.northwestern.edu
- Project Link: https://github.com/394-w24/GiftGuru
