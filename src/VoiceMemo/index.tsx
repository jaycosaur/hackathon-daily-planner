import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import MicRecorder from "mic-recorder-to-mp3";
import { Mic, Stop } from "@material-ui/icons";
import { Button } from "@material-ui/core";

export interface IVoiceMemoProps {
  onUpload: (base64data: string) => void;
}

const VoiceMemo: React.FC<IVoiceMemoProps> = ({ onUpload }) => {
  const [Mp3Recorder, setMp3Recorder] = useState(
    new MicRecorder({ bitRate: 128 })
  );
  const [isRecording, setIsRecording] = useState(false);
  const [blobUrl, setBlobUrl] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [buffer, setBuffer] = useState();
  const [b64, setB64] = useState<string | null>(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log("Permission Granted");
        setIsBlocked(false);
      },
      () => {
        console.log("Permission Denied");
        setIsBlocked(true);
      }
    );
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
        setBlobUrl(blob);
        setBuffer(buffer);

        const file = new File(buffer, "recording.mp3", {
          type: blob.type,
          lastModified: Date.now(),
        });

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const myB64 = reader.result as string;
          console.log(myB64);
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
            paddingTop: 24,
            paddingBottom: 24,
          }}
        >
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
