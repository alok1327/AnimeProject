pipeline {
    agent any  // You can specify a specific agent or leave it as 'any'

    environment {
        // Docker Hub credentials stored in Jenkins (in Credentials Manager)
        DOCKER_HUB_CREDENTIALS = 'docker-hub-credentials-id'
        DOCKER_HUB_REPO = 'secloud007/animerepo'
        IMAGE_TAG = "animeimage"  // Optional: Customize the image tag with the branch name and build number
        EKS_CLUSTER_NAME = 'CICluster'
        AWS_REGION = 'ap-south-1'  // Set your AWS region
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the Git repository
                git 'https://github.com/alok1327/AnimeProject.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    sh """
                    docker build -t ${DOCKER_HUB_REPO}:${IMAGE_TAG} .
                    """
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    // Docker login using credentials from Jenkins credentials manager
                    withCredentials([usernamePassword(credentialsId: DOCKER_HUB_CREDENTIALS, passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        sh """
                        echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
                        """
                    }
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Push the image to Docker Hub
                    sh """
                    docker push ${DOCKER_HUB_REPO}:${IMAGE_TAG}
                    """
                }
            }
        }
    }

           stage('Configure kubectl for EKS') {
            steps {
                script {
                    // Update kubeconfig for the EKS cluster
                    sh """
                    aws eks --region ${AWS_REGION} update-kubeconfig --name ${EKS_CLUSTER_NAME}
                    """
                }
            }
        }

        stage('Deploy to EKS') {
            steps {
                script {
                    // Apply Kubernetes manifests to deploy app to EKS
                    sh """
                    kubectl apply -f deployment.yaml
                    kubectl apply -f service.yaml
                    """
                }
            }
        }
    }

    post {
        always {
            // Clean up Docker images after the build
            sh 'docker system prune -af'
        }
        success {
            echo "Application deployed successfully to EKS!"
        }
        failure {
            echo "Build or deployment failed."
        }
    }
}
