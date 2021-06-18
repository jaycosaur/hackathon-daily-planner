import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import MicRecorder from "mic-recorder-to-mp3";
import { Mic, Stop } from "@material-ui/icons";
import { Button } from "@material-ui/core";

export interface IVoiceMemoProps {
  onUpload: (base64data: string) => void;
}

const VoiceMemo: React.FC<IVoiceMemoProps> = ({ onUpload }) => {
  const [Mp3Recorder] = useState(new MicRecorder({ bitRate: 128 }));
  const [isRecording, setIsRecording] = useState(false);
  const [b64, setB64] = useState<string | null>(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).catch(console.error);
  }, []);

  const startRecording = async () => {
    await Mp3Recorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        setIsRecording(false);

        const file = new File(buffer, "recording.mp3", {
          type: blob.type,
          lastModified: Date.now(),
        });

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const myB64 = reader.result as string;
          setB64(myB64);
        };
      })
      .catch((e) => console.log(e));
  };

  const recordingClick = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const toggleOpen = () => {
    console.log("OPEN SESAME");
    setDialogOpen(!dialogOpen);
  };

  return (
    <>
      <div
        style={{
          width: 64,
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={toggleOpen}
      >
        <Mic></Mic>
      </div>

      <Dialog open={dialogOpen}>
        <div
          style={{
            paddingTop: 12,
            paddingBottom: 24,
          }}
        >
          <h3 style={{ marginLeft: 24, marginRight: 24 }}>Record voice memo</h3>
          <div
            style={{
              textAlign: "center",
            }}
            onClick={recordingClick}
          >
            <Button>
              {!b64 && (isRecording ? <Stop></Stop> : <Mic></Mic>)}
            </Button>
          </div>
          <>
            {b64 && (
              <div
                style={{
                  textAlign: "center",
                }}
              >
                <audio controls>
                  <source src={b64} type="audio/mp3" />
                </audio>
              </div>
            )}
            <div
              style={{
                height: 12,
              }}
            ></div>
            <div
              style={{
                textAlign: "right",
                paddingRight: 8,
              }}
            >
              {b64 && (
                <Button
                  onClick={() => {
                    onUpload(b64);
                    setB64(null);
                    setDialogOpen(false);
                  }}
                >
                  Save
                </Button>
              )}
              <Button
                onClick={() => {
                  setB64(null);
                  setDialogOpen(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </>
        </div>
      </Dialog>
    </>
  );
};

export default VoiceMemo;
