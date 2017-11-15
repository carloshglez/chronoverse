#!/usr/bin/env groovy

pipeline {
    agent any
    options {
        timeout(time: 10, unit: 'MINUTES')
    }
    stages {
        stage('Test') {
            steps {
                echo 'Testing..'
                bat 'npm run-script lint'
            }
        }
        stage('Build') {
            steps {
                echo 'Building..'
                timeout(time: 7, unit: 'MINUTES') {
                    bat 'npm install'
                    bat 'npm run-script build-prod'
                    bat 'npm run-script build-apk'
                }
            }
        }
        stage('Archive') {
            when {
              expression {
                currentBuild.result == null || currentBuild.result == 'SUCCESS'
              }
            }
            steps {
                echo 'Archiving....'
                archiveArtifacts artifacts: 'www/js/*.js', fingerprint: true
                archiveArtifacts artifacts: 'www/*.html', fingerprint: true
                archiveArtifacts artifacts: 'platforms/build/outputs/apk/*.apk', fingerprint: true
            }
        }
    }
}
