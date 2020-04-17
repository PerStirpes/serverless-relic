##### Build the nodejs image

  `$ docker build --no-cache -t foo/node .`

#####  Run the docker container in the background and name it node-app(naming the container is useful for linking to the proxy image)
 
`$ docker run -d -p 3000:3000 --name node-app foo/node`

##### Check to see if the container is running by heading to `localhost:3000`






 