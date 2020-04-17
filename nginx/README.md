
##### Test to see if the nginx is running at localhost:8000
`$ docker run --rm -p 8000:80 nginx`

##### build the nginx image but build the node container first 
 `$ cd nginx`

##### Check to see if nginx is working

`$ docker run --rm -p 8000:80 nginx`

##### Check to see if the container is running by heading to `localhost:8000`

`$ ctrl + c`

##### build the nginx container

`$ docker build -t foo/nginx .`

##### run the following command to link the node app to the proxy container
`$ docker run -p 8000:80 --link node-app:app --name nginx-proxy foo/nginx`


