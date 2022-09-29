import React, {useState} from 'react';
import {View, Image} from 'react-native';
import Modal from 'react-native-modal';
import {setDoc, doc} from 'firebase/firestore';

import styles from './StoryModal.style';
import Button from './../../Button';
import {uploadPhoto} from '../../../utilities/firebaseActions';
import {successMessage} from '../../../utilities/toastMessages';
import {auth,db} from '../../../utilities/firebase';

function StoryModal({visible, close, storyUrl, theme}) {
  //Necessary states are created.
  const [loading, setLoading] = useState(false);

  //Update firestore with new story
  const addStory = async () => {
    setLoading(true);
    const url = await uploadPhoto(storyUrl, 'storyImage');
    if (url !== '') {
      const now = new Date().toISOString();
      await setDoc(doc(db, 'story', auth.currentUser.uid), {
        userId: auth.currentUser.uid,
        displayName: auth.currentUser.displayName,
        storyURL: url,
        dateTime: now,
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
