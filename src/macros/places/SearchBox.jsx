/* global google */
import _ from 'lodash';
import invariant from 'invariant';
import canUseDOM from 'can-use-dom';
import { version, Children, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import {
  construct,
  componentDidMount,
  componentDidUpdate,
  componentWillUnmount,
} from '../../utils/MapChildHelper';

import { MAP, SEARCH_BOX } from '../../constants';

export const __jscodeshiftPlaceholder__ = `{
  "eventMapOverrides": {
  },
  "getInstanceFromComponent": "this.state[SEARCH_BOX]"
}`;

/**
 * A wrapper around `google.maps.places.SearchBox` on the map
 *
 * @see https://developers.google.com/maps/documentation/javascript/3.exp/reference#SearchBox
 */
export class SearchBox extends PureComponent {
  static propTypes = {
    __jscodeshiftPlaceholder__: null,
    /**
     * Where to put `<SearchBox>` inside a `<GoogleMap>`
     *
     * @example google.maps.ControlPosition.TOP_LEFT
     * @type number
     */
    controlPosition: PropTypes.number,
  };

  static contextTypes = {
    [MAP]: PropTypes.object,
  };

  state = {
    [SEARCH_BOX]: null,
  };

  UNSAFE_componentWillMount() {
    if (!canUseDOM || this.containerElement) {
      return;
    }
    invariant(
      google.maps.places,
      `Did you include "libraries=places" in the URL?`
    );
    this.containerElement = document.createElement(`div`);
    this.handleRenderChildToContainerElement();
    if (version.match(/^16/)) {
      return;
    }
    this.handleInitializeSearchBox();
  }

  componentDidMount() {
    let searchBox = this.state[SEARCH_BOX];
    if (version.match(/^16/)) {
      searchBox = this.handleInitializeSearchBox();
    }
    componentDidMount(this, searchBox, eventMap);
    this.handleMountAtControlPosition();
  }

  UNSAFE_componentWillUpdate(nextProp) {
    if (this.props.controlPosition !== nextProp.controlPosition) {
      this.handleUnmountAtControlPosition();
    }
  }

  componentDidUpdate(prevProps) {
    componentDidUpdate(
      this,
      this.state[SEARCH_BOX],
      eventMap,
      updaterMap,
      prevProps
    );
    if (this.props.children !== prevProps.children) {
      this.handleRenderChildToContainerElement();
    }
    if (this.props.controlPosition !== prevProps.controlPosition) {
      this.handleMountAtControlPosition();
    }
  }

  componentWillUnmount() {
    componentWillUnmount(this);
    this.handleUnmountAtControlPosition();
    if (version.match(/^16/)) {
      return;
    }
    if (this.containerElement) {
      ReactDOM.unmountComponentAtNode(this.containerElement);
      this.containerElement = null;
    }
  }

  handleInitializeSearchBox() {
    /*
     * @see https://developers.google.com/maps/documentation/javascript/3.exp/reference#SearchBox
     */
    const searchBox = new google.maps.places.SearchBox(
      this.containerElement.querySelector('input')
    );
    construct(SearchBox.propTypes, updaterMap, this.props, searchBox);
    this.setState({
      [SEARCH_BOX]: searchBox,
    });
    return searchBox;
  }

  handleRenderChildToContainerElement() {
    if (version.match(/^16/)) {
      return;
    }
    ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      Children.only(this.props.children),
      this.containerElement
    );
  }

  handleMountAtControlPosition() {
    if (isValidControlPosition(this.props.controlPosition)) {
      this.mountControlIndex =
        -1 +
        this.context[MAP].controls[this.props.controlPosition].push(
          this.containerElement.firstChild
        );
    }
  }

  handleUnmountAtControlPosition() {
    if (isValidControlPosition(this.props.controlPosition)) {
      const child = this.context[MAP].controls[
        this.props.controlPosition
      ].removeAt(this.mountControlIndex);
      if (child !== undefined) {
        this.containerElement.appendChild(child);
      }
    }
  }

  render() {
    if (version.match(/^16/)) {
      return ReactDOM.createPortal(
        Children.only(this.props.children),
        this.containerElement
      );
    }
    return false;
  }
}

export default SearchBox;

const isValidControlPosition = _.isNumber;

const eventMap = {};

const updaterMap = {};
