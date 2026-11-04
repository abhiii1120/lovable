import * as k8s from "@kubernetes/client-node";
import { response } from "express";

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

export async function createPod(){
    const podManifest = {
        apiVersion:'v1',
        kind:'Pod',
        metadata:{
            name:'nextjs-pod',
            labels:{
                app:'nextjs'
            }
        },
        spec:{
            containers:[
                {
                    name:'nextjs-container',
                    image:'nextjs-boilerplate',
                    ports:[
                        {
                            containerPort:3000
                        }
                    ],
                    resources:{
                        requests:{
                            memory:'1024Mi',
                            cpu:'500m'
                        },
                        limits:{
                            memory:'2048Mi',
                            cpu:'1000m'
                        }
                    }
                }
            ]
        }
    }

    const response = await k8sApi.createNamespacedPod({
    namespace:"default",
    body:podManifest
});

console.log("pod successfully created!")
console.log(response);
};

