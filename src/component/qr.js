import React, { memo, useState, useMemo } from 'react';
import { SafeAreaView, Image, Pressable, Modal, Dimensions } from 'react-native';
import { Text, View, Button } from 'react-native-ui-lib';
import QRCode from 'react-native-qrcode-svg';
import auth from '@react-native-firebase/auth';
import { Colors, Images, Fonts } from '@constants';
const { width } = Dimensions.get('screen')

const Qr = ({ }) => {
  const [showQr, _showQr] = useState(false);
  const uid = useMemo(() => auth().currentUser?.uid, [])
  return (
    <>
      <View style={{ backgroundColor: Colors.gray200, padding: 16 }} >
        <View row >
          <View style={{ backgroundColor: Colors.white, paddingVertical: 8, paddingHorizontal: 16, flex: 1, borderRadius: 16, marginRight: 6 }}>
            <Text fs12 lh18 gray900>Your Credits</Text>
            <View row centerV>
              <Text beb24 lh32 gray900>1,200</Text>
              <Image source={Images.star} style={{ marginLeft: 8, height: 20, width: 20 }} />
            </View>
          </View>
          <View style={{ backgroundColor: Colors.white, paddingVertical: 8, paddingHorizontal: 16, flex: 1, borderRadius: 16, marginLeft: 6 }}>
            <Text fs12 lh18 gray900>Following</Text>
            <View row centerV>
              <Text beb24 lh32 gray900>10</Text>
              <Image source={Images.briefcase} style={{ marginLeft: 8, height: 20, width: 20 }} />
            </View>
          </View>
        </View>
        <View style={{ borderRadius: 16, flexDirection: 'row', marginTop: 12, backgroundColor: Colors.white, padding: 24, alignItems: 'center' }} >
          <QRCode
            value={uid}
            size={width / 3}
          />
          <View style={{ flex: 1, borderRadius: 16, marginLeft: 24, justifyContent: 'center' }}>
            <Text fs14 lh20 black>Scan this to get rewarded or redeem Lealzy Points!</Text>
            <Button
              label={'View QR Code'}
              marginT-16
              onPress={() => _showQr(true)}
              labelStyle={{ fontWeight: '500', ...Fonts.fs14 }}
            />
          </View>
        </View>
      </View>
      {showQr ?
        <Modal visible={true} transparent animationType='fade' >
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }} >
            <View padding-24 bg-white style={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }} >
              <View style={{ flexDirection: 'row', borderRadius: 24, justifyContent: 'space-between' }} >
                <View style={{ height: 24, width: 24 }} />
                <Text fs24SB black >Your QR Code</Text>
                <Pressable onPress={() => _showQr(false)} >
                  <Image source={Images.x} style={{ height: 24, width: 24 }} />
                </Pressable>
              </View>
              <View style={{ marginTop: 40, alignItems: 'center' }}>
                <QRCode
                  value={uid}
                  size={width - 96}
                />
                <Text fs16SB lh24 black center marginT-24 marginB-40 marginH-50 >Scan this to get rewarded or redeem Lealzy Points!</Text>
              </View>
            </View>
          </View>
        </Modal>
        : null}
    </>

  );
}

export default memo(Qr)