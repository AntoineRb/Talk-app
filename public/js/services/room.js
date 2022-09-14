const socket = io('/');
const peer = new Peer();
const roomID = document.querySelector('.room-section').id
let userVideoStream ;
let userPeerId;
let videoGrid = document.getElementById('video-container')
let userVideo = document.createElement('video');
userVideo.muted = true;

const peerConnections = {}

navigator.mediaDevices.getUserMedia({
  video:true,
  audio:true
}).then(( stream ) => {
  userVideoStream = stream;
  addVideo( userVideo , stream );
  peer.on( 'call' , call => {
    call.answer( stream );
    const vid = document.createElement('video');
    call.on('stream' , userStream => {
      addVideo(vid , userStream);
    })
    call.on('error' , (err)=>{
      alert(err)
    })
    call.on("close", () => {
        vid.remove();
    })
    peerConnections[ call.peer ] = call;
  })
}).catch( err => {
    alert( err.message )
})

peer.on( 'open' , ( id ) => {
  userPeerId = id;
  socket.emit("newUser" , userPeerId , roomID);
})
peer.on( 'error' , ( err ) => {
  alert( err.type );
});

socket.on( 'userJoined' , id => {
  // create new video call
  const call  = peer.call( id , userVideoStream );
  const vid = document.createElement( 'video' );
  call.on( 'error' , ( err ) => {
    alert( err );
  });
  call.on( 'stream', userStream => {
      addVideo( vid , userStream );
  });
  call.on('close' , () => {
    vid.remove();
  });
  peerConnections[id] = call;
})

socket.on('userDisconnect', id => {
  if( peerConnections[ id ] ) {
    peerConnections[ id ].close();
  }
})

function addVideo( video , stream ){
    const videoToDisplay = video; 
    videoToDisplay.srcObject = stream;
    videoToDisplay.addEventListener('loadedmetadata', () => {
      videoToDisplay.play()
    });
    videoGrid.append( video );
}