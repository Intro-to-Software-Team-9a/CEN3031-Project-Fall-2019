import React from 'react';
import PaypalButton from '../components/PaypalButton';
import { Form } from 'react-bootstrap';
const CLIENT = {
  sandbox: 'AY7O6M0NDbBh3f6eaRpynKmm5v7KUgf6pWaKXJIr3UY0i10x5uPB9a6CmjUWlWD-jpZ8HWXJFuJq03fL',
  production: 'EARZHbTGFb5tyUMQG_Y5O6ScxbOeD13uxUqmOHYuylnekbR1Y8SQzH_un2XyIoU9TyxwR5k_BrEswuPF',
};
const docs = [{"name":"doc1", "price":10, "selected":"0"},
              {"name":"doc2", "price":15, "selected":"0"},
              {"name":"doc3", "price":100, "selected":"0"}]
              var i = 0;
              var totals = 0;
const ENV = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'sandbox';
class paypalTest extends React.Component {
  render() {
    const onSuccess = (payment) =>
      console.log('Successful payment!', payment);
    const onError = (error) =>
      console.log('Erroneous payment OR failed to load script!', error);
    const onCancel = (data) =>
      console.log('Cancelled payment!', data);
    return (
      <div>
          <Form.Group>
            <Form.Label>Documents</Form.Label>
                {docs.map((doc) => (
                    <Form.Check
                    key={doc.name}
                    type="checkbox"
                    label={doc.name}
                    name={doc.name}
                    onChange={() => {if (doc.selected === '0') {doc.selected = '1'; totals += doc.price; this.forceUpdate()} else {doc.selected = '0'; totals -= doc.price; this.forceUpdate()}; console.log(totals) }}
                    />
                ))}
            </Form.Group>
            <PaypalButton
                client={CLIENT}
                env={ENV}
                commit={true}
                currency={'USD'}
                total={totals}
                onSuccess={onSuccess}
                onError={onError}
                onCancel={onCancel}
            />
      </div>
    );
  }
}
export default paypalTest;