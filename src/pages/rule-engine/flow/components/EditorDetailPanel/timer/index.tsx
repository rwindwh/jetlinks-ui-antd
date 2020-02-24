import React, { useState } from 'react';
import { Input, Form, Row, Col } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import basicConfig from '../basicConfig';
import { NodeProps } from '../data';

interface Props extends FormComponentProps, NodeProps {}
interface State {
  nodeData: any;
}
const Timer: React.FC<Props> = props => {
  const initState: State = {
    nodeData: props.config,
  };

  const [nodeData] = useState(initState.nodeData);

  const {
    form: { getFieldDecorator },
    form,
  } = props;

  const inlineFormItemLayout = {
    labelCol: {
      sm: { span: 5 },
    },
    wrapperCol: {
      sm: { span: 19 },
    },
  };

  const config: any[] = [
    {
      label: 'cron表达式',
      key: 'config.cron',
      styles: {
        lg: { span: 24 },
        md: { span: 24 },
        sm: { span: 24 },
      },
      component: <Input />,
    },
    {
      label: '执行参数（JSON）',
      key: 'config.params',
      styles: {
        lg: { span: 24 },
        md: { span: 24 },
        sm: { span: 24 },
      },
      component: <Input.TextArea rows={3} />,
    },
  ];

  const saveModelData = () => {
    const temp = form.getFieldsValue();
    props.save(temp);
  };

  return (
    <Form {...inlineFormItemLayout}>
      <Row gutter={16}>
        {[...basicConfig, ...config].map(item => (
          <Col
            key={item.key}
            {...item.styles}
            onBlur={() => {
              saveModelData();
            }}
          >
            <Form.Item label={item.label} {...item.formStyle}>
              {getFieldDecorator<string>(item.key, {
                initialValue:
                  nodeData &&
                  nodeData[item.key] &&
                  (typeof nodeData[item.key] === 'string'
                    ? nodeData[item.key]
                    : nodeData.config && nodeData.config[item.key.replace('config.', '')]),
              })(item.component)}
            </Form.Item>
          </Col>
        ))}
      </Row>
    </Form>
  );
};
export default Form.create<Props>()(Timer);
