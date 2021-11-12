pipeline {
   agent any

   tools { nodejs "node"}

   stages {
      stage('Example') {
         steps {
            sh 'npm config ls'
         }
      }
      // stage('checkout') {
      //     steps {
      //       checkout scm
      //       discordSend description: ":cyclone: *Cloning Repo*", result: currentBuild.currentResult,
      //                   webhookURL: "https://discord.com/api/webhooks/908752964670337095/S9h_mpTXF3r2IOgzYnB9zefPAMpCiUaGOBgAFoEgIhFGUxMxR6oJBGq-ijpqtly9Lybz"
      //       }
      // }
      // stage('NPM Install') {
      //    nodejs(nodeJSInstallationName: 'node') {
      //       sh 'npm -v'  //substitute with your code
      //       sh 'node -v'
      //    }
      // }
      // stage('build') {
      //    steps {
      //       sh 'ng build --aot'
      //    }
      // }
   }
}