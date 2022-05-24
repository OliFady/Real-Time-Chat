const socket = io();
const chatForm = document.getElementById('send');
const chatMessages = document.querySelector('.chat-messages');
const messageTemplate = document.querySelector('#message-template').innerHTML; //Mustache Template Generator
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })   //Query Selector to select Username and Password 
const messages = document.querySelector('#messages')




socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    })
    chatMessages.insertAdjacentHTML('beforeend', html)
})

socket.on('locationMessage', (message) => {
  console.log(message)
  const html = Mustache.render(messageTemplate, {
        username: message.username,
        url: message.url,
        createdAt: moment(message.createdAt).format('h:mm a')
  })
  chatMessages.insertAdjacentHTML('beforeend', html)
})

/*document.querySelector('#send').addEventListener('click',(e)=>{
  e.preventDefault();
  console.log("Message")
})*/


chatForm.addEventListener('click',(e)=>{

 e.preventDefault();

 const message = document.getElementById('msg')
 
 socket.emit('sendMessage',message.value);
 message.value = '';
})


document.querySelector('#location').addEventListener('click',(e)=>{
  e.preventDefault();

  if (!navigator.geolocation){
    return alert("Geolocation not supported");
  }

  navigator.geolocation.getCurrentPosition((position)=>{
    console.log(position);
    socket.emit('sendLocation',{
      latitude : position.coords.latitude,
      longitude : position.coords.longitude
    })
  })
})

socket.emit('join', { username, room }, (error) => {
  if (error) {
      alert(error)
      location.href = '/'
  }
})
