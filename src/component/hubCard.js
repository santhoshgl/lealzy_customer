import React, { memo } from "react";
import { StyleSheet, Image } from "react-native";
import { View, Text } from "react-native-ui-lib";
import { Colors, Images } from "../constants";

const HubCard = ({ item, onSelect = () => { } }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header} >
        <Image source={{ uri: item?.logo }} style={styles.userImg} />
        <View marginL-12>
          <Text beb24 black lh32>{item?.name}</Text>
          <View row centerV>
            <Image source={Images.pin} style={styles.pinImg} resizeMode={'contain'} />
            <Text fa12 gray500 marginL-8 ln18>{item?.city}{item?.state ? `, ${item?.state}` : ''}{item?.country ? `, ${item?.country}` : ''}</Text>
          </View>
        </View>
      </View>
      <View row marginT-12 marginH-16 >
        <View style={[styles.businessBox, { marginRight: 4 }]} >
          <Image source={Images.business} style={styles.icon} />
          <View marginL-8>
            <Text fs12 gray500 lh18>Businesses</Text>
            <Text fs14 black lh20>{item?.totalBusiness || 0}</Text>
          </View>
        </View>
        <View style={[styles.businessBox, { marginLeft: 4 }]} >
          <Image source={Images.tag} style={styles.icon} />
          <View marginL-8>
            <Text fs12 gray500 lh18>Active Offers</Text>
            <Text fs14 black lh20>{item?.totalOffers || 0}</Text>
          </View>
        </View>
      </View>
      <View style={styles.separator} />
      <Text fs14SB lh20 primary700 center marginV-12 onPress={onSelect} >Select</Text>
    </View>
  )
}

export default memo(HubCard)

const styles = StyleSheet.create({
  card: {
    borderWidth: 1, borderRadius: 16,
    borderColor: Colors.gray200,
    backgroundColor: Colors.white,
    shadowColor: 'rgba(16,24,40,0.05)',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
    marginTop: 16
  },
  header: {
    marginHorizontal: 16, marginTop: 16,
    flexDirection: 'row'
  },
  userImg: { height: 50, width: 50, borderRadius: 50 },
  pinImg: { height: 15, width: 12 },
  businessBox: {
    flex: 1, alignItems: 'center',
    paddingVertical: 6, paddingHorizontal: 12,
    borderRadius: 12, borderWidth: 1,
    borderColor: Colors.gray200, flexDirection: 'row',
  },
  icon: { height: 24, width: 24, borderRadius: 24 },
  separator: {
    borderTopWidth: 1, borderColor: Colors.gray200,
    marginTop: 16
  }
})