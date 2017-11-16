#!/usr/bin/env groovy

pipeline {
    agent any
    options {
        timeout(time: 10, unit: 'MINUTES')
    }
    stages {
        stage('Test') {
            steps {
                echo 'Testing...'
                bat 'npm run-script lint'
            }
        }
        stage('Prepare') {
            steps {
                echo 'Preparing...'
                timeout(time: 5, unit: 'MINUTES') {
                    bat 'npm install'
                    bat 'cordova platform rm android'
                    bat 'cordova platform add android'
                }
            }
        }
        stage('Build') {
            steps {
                echo 'Building...'
                timeout(time: 4, unit: 'MINUTES') {
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
                archiveArtifacts artifacts: 'platforms/android/build/outputs/apk/*.apk', fingerprint: true
            }
        }
    }
}
