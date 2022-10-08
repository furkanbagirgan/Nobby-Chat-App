import React, {useState} from 'react';
import {View, Image} from 'react-native';
import Modal from 'react-native-modal';
import {updateDoc, doc, Timestamp} from 'firebase/firestore';
import {useSelector} from 'react-redux';

import styles from './StoryModal.style';
import Button from './../../Button';
import {uploadPhoto} from '../../../utilities/firebaseActions';
import {successMessage} from '../../../utilities/toastMessages';
import {auth, db} from '../../../utilities/firebase';

function StoryModal({visible, close, storyUrl}) {
  //Necessary states are created.
  const theme = useSelector(state => state.theme.theme);
  const [loading, setLoading] = useState(false);

  //Update firestore with new story
  const addStory = async () => {
    setLoading(true);
    const url = await uploadPhoto(storyUrl, 'storyImage');
    if (url !== '') {
      await updateDoc(doc(db, 'contact', auth.currentUser.uid), {
        storyURL: url,
        storyDate: Timestamp.fromDate(new Date()),
      });
      successMessage('Story successfully shared');
      close();
    }
    setLoading(false);
  };

  //Elements that will appear on the screen are defined here
  return (
    <Modal
      style={styles[theme].modal}
      isVisible={visible}
      onSwipeComplete={close}
      onBackdropPress={close}
      onBackButtonPress={close}>
      <View style={styles[theme].container}>
        <View style={styles[theme].imageWrapper}>
          <Image source={{uri: storyUrl}} style={styles[theme].image} />
        </View>
        <View style={styles[theme].buttonContainer}>
          <Button title="Cancel" onClick={close} theme="dark" />
          <Button
            title="Share"
            onClick={addStory}
            theme="blue"
            loading={loading}
          />
        </View>
      </View>
    </Modal>
  );
}

export default StoryModal;
