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
            when {
              expression {
                currentBuild.result == null || currentBuild.result == 'SUCCESS'
              }
            }
            steps {
                echo 'Preparing...'
                timeout(time: 6, unit: 'MINUTES') {
                    bat 'npm install'
                    bat 'cordova platform rm android'
                    bat 'cordova platform add android'
                }
            }
        }
        stage('Build') {
            when {
              expression {
                currentBuild.result == null || currentBuild.result == 'SUCCESS'
              }
            }
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
                archiveArtifacts artifacts: 'www/js/bundle.js', fingerprint: true
                archiveArtifacts artifacts: 'www/*.html', fingerprint: true
                archiveArtifacts artifacts: 'platforms/android/build/outputs/apk/*.apk', fingerprint: true
            }
        }
    }
}
