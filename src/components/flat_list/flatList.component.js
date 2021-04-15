import { Text } from "native-base";
import React, { Component } from "react";
import { FlatList, RefreshControl } from "react-native";
import colors from "../../colors";
import NoContentComponent from "./../no_content/noContent.component";

export default class FlatlistComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        }
    }

    render() {
        return (
            <FlatList
              contentContainerStyle={{ paddingHorizontal: 10, marginTop: 20}}
              refreshControl={
                  <RefreshControl 
                  onRefresh={async () => {
                    this.setState({refreshing: true});
                    this.props.onRefresh && await this.props.onRefresh();
                    this.setState({refreshing: false});
                  }} 
                  refreshing={this.state.refreshing}
                  colors={[colors.orange, colors.success]} progressBackgroundColor={colors.white} />
              }
          //   onRefresh={this.onRefresh}
          //   refreshing={this.state.refreshing}
            // ListFooterComponent={
            //   <>
            //     <Text style={[{textAlign: 'center'}]}>Loading...</Text>
            //   </>
            // }
            ListEmptyComponent={<NoContentComponent text={this.props.route && this.props.route.params && this.props.route.params.emptyContent ? this.props.emptyContent : "Nothing to show here."} />}
            data={this.props.data || []}
            renderItem={this.props.renderItem}
            keyExtractor={(item) => item.id}
            onEndReached={() => {this.props.onEndReached && this.props.onEndReached()}}
            onEndReachedThreshold={0.8}
            // extraData={selectedId}
          />
        );
    }
}