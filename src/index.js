import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  View,
  Text,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default class extends PureComponent {
  static defaultProps = {
    initialNumToRender: 1,
    maxToRenderPerBatch: 1,
    horizontal: false,
    scrollEnabled: false,
    renderItem: this._deafultRenderItem,
    setViewableHeight: null,
    data: [],
  }

  static propTypes = {
    initialNumToRender: PropTypes.number,
    maxToRenderPerBatch: PropTypes.number,
    horizontal: PropTypes.bool,
    scrollEnabled: PropTypes.bool,
    renderItem: PropTypes.func,
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    setViewableHeight: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this._initiatingCheckTabSwiper();
  }

  componentWillReceiveProps({ scrollMoveToIndex }) {
    this._scrollToIndex(scrollMoveToIndex);
  }

  _scrollToIndex = (scrollMoveToIndex) => {
    const {
      scrollAnimated,
      scrollAction,
    } = this.props;

    if (scrollMoveToIndex < 0) { return; }
    if (typeof scrollAction === 'function') { scrollAction(scrollMoveToIndex); }

    this.tabSwiper.scrollToIndex({
      animated: scrollAnimated,
      index: scrollMoveToIndex,
    });
  }

  _initiatingCheckTabSwiper = () => {
    const { data } = this.props;
    if (!Array.isArray(data) || data.length === 0) {
      console.error("tabSlider isn't have any data");
    }
  }

  _keyExtractor = (item, index) => index;

  _getItemLayout = (data, index) => {
    const {
      horizontal,
    } = this.props;

    const ITEM_LENGHT = horizontal ? width : height;

    return {
      length: ITEM_LENGHT,
      offset: ITEM_LENGHT * index,
      index,
    };
  }

  _deafultRenderItem = ({ item }) => (
    <View style={{ width }}>
      {typeof item === 'object' ? item : <Text>{item}</Text>}
    </View>
  )

  render() {
    const {
      data,
      horizontal,
      scrollEnabled,
      renderItem,
      initialNumToRender,
      maxToRenderPerBatch,
      setViewableHeight,
    } = this.props;

    const styles = (typeof setViewableHeight === 'function' && setViewableHeight() > 0)
      ? [{ flex: 1, height: setViewableHeight() }] : { flex: 1 };

    return (
      <FlatList
        data={data}
        scrollEnabled={scrollEnabled}
        horizontal={horizontal}
        renderItem={renderItem}
        getItemLayout={this._getItemLayout}
        keyExtractor={this._keyExtractor}
        initialNumToRender={initialNumToRender}
        maxToRenderPerBatch={maxToRenderPerBatch}
        style={styles}
        ref={(listNode) => { this.tabSwiper = listNode; }}
      />
    );
  }
}