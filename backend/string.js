const client=require('./client')
async function init(){
   await client.set('user:1',"helllo");
   await client.expire("user:1",20);
    const result=await client.get('user:1');
    console.log("Result->",result)
}

init();
