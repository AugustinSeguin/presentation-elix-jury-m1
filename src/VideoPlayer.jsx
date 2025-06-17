import React from 'react';

function VideoPlayer({ onEnd }) {
  return (
    <div>
      <video
        controls
        width="1320px"
        autoPlay
        onEnded={onEnd} // ← Appelé quand la vidéo se termine
      >
        <source src="/maquettes.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas la balise vidéo.
      </video>
    </div>
  );
}

export default VideoPlayer;
