/*
 * -----------------------------------------------------------------------------
 * This file is auto-generated from the corresponding file at `src/macros/`.
 * Please **DO NOT** edit this file directly when creating PRs.
 * -----------------------------------------------------------------------------
 */
/* global google */
import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  construct,
  componentDidMount,
  componentDidUpdate,
  componentWillUnmount,
} from '../utils/MapChildHelper';

import { MAP, FUSION_TABLES_LAYER } from '../constants';

/**
 * A wrapper around `google.maps.FusionTablesLayer`
 *
 * @see https://developers.google.com/maps/documentation/javascript/3.exp/reference#FusionTablesLayer
 */
export class FusionTablesLayer extends PureComponent {
  static contextTypes = {
    [MAP]: PropTypes.object,
  };

  static propTypes = {
    /**
     * @type FusionTablesLayerOptions
     */
    defaultOptions: PropTypes.any,

    /**
     * @type FusionTablesLayerOptions
     */
    options: PropTypes.any,

    /**
     * function
     */
    onClick: PropTypes.func,
  };

  /*
   * @see https://developers.google.com/maps/documentation/javascript/3.exp/reference#FusionTablesLayer
   */
  constructor(props, context) {
    super(props, context);
    const fusionTablesLayer = new google.maps.FusionTablesLayer();
    construct(
      FusionTablesLayer.propTypes,
      updaterMap,
      this.props,
      fusionTablesLayer
    );
    fusionTablesLayer.setMap(this.context[MAP]);
    this.state = {
      [FUSION_TABLES_LAYER]: fusionTablesLayer,
    };
  }

  componentDidMount() {
    componentDidMount(this, this.state[FUSION_TABLES_LAYER], eventMap);
  }

  componentDidUpdate(prevProps) {
    componentDidUpdate(
      this,
      this.state[FUSION_TABLES_LAYER],
      eventMap,
      updaterMap,
      prevProps
    );
  }

  componentWillUnmount() {
    componentWillUnmount(this);
    const fusionTablesLayer = this.state[FUSION_TABLES_LAYER];
    if (fusionTablesLayer) {
      fusionTablesLayer.setMap(null);
    }
  }

  render() {
    return false;
  }
}

export default FusionTablesLayer;

const eventMap = {
  onClick: 'click',
};

const updaterMap = {
  options(instance, options) {
    instance.setOptions(options);
  },
};
