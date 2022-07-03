import { observer } from "mobx-react-lite";
import QRCode from "qrcode.react";
import { useEffect, useRef, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import ReactToPrint from "react-to-print";

interface Props {
  id: string;
}
export default observer(function PacketDetailsQRCode({ id }: Props) {
  const [idEncoded, setIdEncoded] = useState<string>("");
  const componentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (id) {
      setIdEncoded(`${encodeURIComponent(encodeURIComponent(id))}`);
    }
  }, [id]);

  return (
    <>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        Generated QR code for the packet
      </Segment>
      <Segment attached>
        <Item style={{ position: "relative" }}>
          <Label style={{ position: "absolute" }} color="orange" ribbon="right">
            Put on packet before sending
          </Label>
          <Item.Content>
            <div style={{ textAlign: "center" }}>
              <Item.Image style={{ paddingTop: 30 }}>
                <div ref={componentRef}>
                  <QRCode value={idEncoded} style={{ height: 250, width: 250 }} />
                </div>
              </Item.Image>
              <Item.Extra style={{ paddingTop: 20 }}>
                <ReactToPrint
                  trigger={() => (
                    <Button variant="contained" color="teal">
                      Print QR code
                    </Button>
                  )}
                  content={() => componentRef.current}
                />
              </Item.Extra>
            </div>
          </Item.Content>
        </Item>
      </Segment>
    </>
  );
});
