#### From the root of the project

1.  `$ cd nginx`

##### Test to see if nginx is running at localhost:8000

`$ docker run --rm -p 8000:80 nginx`

##### build the nginx image NOTE: build the node container first 
##### Check to see if the nginx container up by running a then visiting `localhost:8000`

`$ docker run --rm -p 8000:80 nginx`

##### Kill the process

`$ ctrl + c`

##### build the nginx container

`$ docker build -t foo/nginx .`

##### run the following command to link the node app to the proxy container

`$ docker run -p 8000:80 --link node-app:app --name nginx-proxy foo/nginx`


