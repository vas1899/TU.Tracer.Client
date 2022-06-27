import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../stores/store";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomTextInput from "../../common/form/CustomTextInput";
import CustomTextArea from "../../common/form/CustomTextArea";
import CustomDropDownMenu from "../../common/form/CustomDropDownMenu";
import { categoryOptions } from "../../common/form/categoryOptions";
import CustomDatePicker from "../../common/form/CustomDatePicker";
import { Packet } from "../../../models/Packet";
import { v4 as uuidv4 } from "uuid";

export default observer(function PacketForm() {
  const history = useHistory();
  const { packetStore } = useStore();
  const { submitting, loadPacket, createRequestPacket, editRequestPacket } = packetStore;
  let { id } = useParams<{ id: string }>();

  const [packet, setPacket] = useState({
    id: "",
    title: "",
    description: "",
    category: "",
    date: new Date(),
    city: "",
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    date: Yup.string().required("Required").nullable(),
  });

  useEffect(() => {
    if (id) loadPacket(id).then((packet) => setPacket(packet!));
  }, [id, loadPacket]);

  function onHandleSubmit(packet: Packet) {
    if (packet.id) {
      editRequestPacket(packet).then(() => history.push(`/packets/${packet.id}`));
    } else {
      packet.id = uuidv4();
      createRequestPacket(packet).then(() => history.push(`/packets/${packet.id}`));
    }
  }

  return (
    <Segment clearing>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={packet}
        onSubmit={(values) => onHandleSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit}>
            <CustomTextInput placeholder="Title" name="title" />
            <CustomDatePicker
              placeholderText="Date"
              name="date"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            <CustomDropDownMenu options={categoryOptions} placeholder="Category" name="category" />
            <Header content="Additional info" sub color="blue" />
            <CustomTextInput placeholder="City" name="city" />
            <CustomTextArea placeholder="Description" name="description" rows={3} />
            <Button
              disabled={!isValid || isSubmitting || !dirty}
              loading={submitting}
              positive
              content="Submit"
              type="submit"
              onClick={() => {
                handleSubmit();
              }}
            />
            <Button
              type="reset"
              content="Close"
              as={NavLink}
              to={packet.id ? `/packets/${packet?.id}` : "/packets"}
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
