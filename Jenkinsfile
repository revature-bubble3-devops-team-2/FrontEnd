def discordurl = "https://discord.com/api/webhooks/908752964670337095/S9h_mpTXF3r2IOgzYnB9zefPAMpCiUaGOBgAFoEgIhFGUxMxR6oJBGq-ijpqtly9Lybz"
pipeline {
   agent any

   tools { nodejs "node"}

   stages {
      stage('checkout') {
         steps {
            checkout scm
            discordSend description: ":cyclone: *Cloning Repo*", result: currentBuild.currentResult, webhookURL: discordurl
         }
      }
      stage('Install Dependencies') {
         steps {
            sh 'npm uninstall @angular/cli --legacy-peer-deps'
            sh 'npm install @angular/cli'
            discordSend description: ":construction_site: *Dependencies Updated*", result: currentBuild.currentResult, webhookURL: discordurl
         }
      }
      stage('build') {
         steps {
            sh 'ng build --aot'
            discordSend description: ":desktop: *Webpage Successfully Built*", result: currentBuild.currentResult, webhookURL: discordurl
         }
      }
   }
   post {
      success {
         discordSend description: ":whale2: *Ready for Docker pick up*", result: currentBuild.currentResult, webhookURL: discordurl
      }
   }
}