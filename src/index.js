import React, { Component } from 'react';
import {
    FlatList,
    View,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default class extends Component {
    
    constructor(props) {
      super(props);

      this._initiatingCheckTabSwiper();
    }

    componentDidMount() {
      this._onLoadTabSwiper();

      if(this.props.debugMode) {
        console.log('props when is called ComponentDidMount', this.props);
        console.log('state when is called ComponentDidMount', this.state);
      } 
    }

    componentWillUpdate(nextProps, nextState) {
        if(nextProps.scrollToIndex) {
            this._scrollToIndex(nextProps.scrollToIndex);
        }
    }
    
    _scrollToIndex = ({animated, index}) => {
        console.log(index)
        this.tabSwiper.scrollToIndex({animated, index});
    }

    _onLoadTabSwiper = () => {
        const { onLoadTabSwiper } = this.props;

        if(onLoadTabSwiper === undefined) {
            return;
        }

        if(typeof onLoadTabSwiper !== 'function') {
            console.error("onLoadTabSwiper is a function which called when 'tabSwiepr' is mounted.")
            return;
        }

        onLoadTabSwiper();
    }

    _initiatingCheckTabSwiper = () => {
        const { data, renderItem } = this.props;
        if(!Array.isArray(data) || data.length === 0) {
            console.error("tabSlider isn't have any data")
        }
    }

    _keyExtractor = (item, index) => {
        return index + Math.random() + '';
    }

    _getItemLayout = (data, index) => {
        
        const ITEM_LENGHT = this.props.horizontal ? width : height;

        return {
            length: ITEM_LENGHT,
            offset: ITEM_LENGHT * index, 
            index 
        }
    }

    _deafultRenderItem = ({item, index}) => (
        <View style={styles.slide}>
            {typeof item === 'object' ? item : <Text>{item}</Text>}
        </View>
    )

    render() {

       const { 
           data, 
           renderItem,
           horizontal,
           scrollEnabled,
        } = this.props;
        
       return (
         <FlatList
            styles={styles.container}
            ref={list => { this.tabSwiper = list}}
            data={data}
            initialNumToRender={1}
            renderItem={renderItem ? renderItem : this._deafultRenderItem}
            getItemLayout={this._getItemLayout}
            horizontal={horizontal || false}
            keyExtractor={this._keyExtractor}
            scrollEnabled={scrollEnabled || false}
         />
       )
    }
}

const styles = StyleSheet.create({
    container: {
        width,
        height,
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    slide: {
        width,
        height,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    }
});