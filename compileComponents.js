import React from 'react';
import { string, array, object, objectOf, func, shape } from 'prop-types';

const propTypes = {
  data: shape({
    type: string.isRequired,
    props: object.isRequired,
    children: array.isRequired,
  }).isRequired,
  components: objectOf(func).isRequired,
};

const component = ({ data, components }) => {
  const compile = (componentData) => {
    const { type, key, props, children } = componentData;
    const Component = components[type];
    if (!Component) {
      throw new Error(`Component ${type} not found`);
    }
    return (
      <Component key={key} {...props}>
        {children.map((options, id) => compile({ key: id, ...options }))}
      </Component>
    );
  };

  return compile(data);
};

component.propTypes = propTypes;
export default component;

