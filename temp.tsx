import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import ChevronDownWrapper from './assets/chevrondownwrapper.svg';
import ChevronDownWrapper2 from './assets/chevrondownwrapper2.svg';
import ChevronDownWrapper3 from './assets/chevrondownwrapper3.svg';
import ChevronLeftWrapper from './assets/chevronleftwrapper.svg';
import IosBatteryFull from './assets/iosbatteryfull.svg';
import IosSignal from './assets/iossignal.svg';
import IosWifiSignal from './assets/ioswifisignal.svg';

import type { StyleProp, ViewStyle } from 'react-native';

export interface AddMedicationRefinedProps {
  /** Used to override the default root style. */
  style?: StyleProp<ViewStyle>,
  /** Used to locate this view in end-to-end tests. */
  testID?: string,
}

export function AddMedicationRefined(props: AddMedicationRefinedProps) {
  return (
    <View testID={props.testID ?? "28:2"} style={[styles.root, props.style]}>
      <View testID="8:5" style={styles.statusBar}>
        <Text testID="8:6" style={styles.time}>
          {`9:41`}
        </Text>
        <View testID="8:7" style={styles.statusIcons}>
          <IosSignal/>
          <IosWifiSignal/>
          <IosBatteryFull/>
        </View>
      </View>
      <View testID="8:14" style={styles.navigationBar}>
        <View testID="8:15" style={styles.backButton}>
          <ChevronLeftWrapper/>
        </View>
      </View>
      <View testID="8:18" style={styles.mainContent}>
        <View testID="8:19" style={styles.headerText}>
          <Text testID="8:20" style={styles.title}>
            {`Add medication`}
          </Text>
          <Text testID="8:21" style={styles.subtitle}>
            {`Set up your medication and when you need to take it.`}
          </Text>
        </View>
        <View testID="8:22" style={styles.formStack}>
          <View testID="8:23" style={styles.fieldGroupName}>
            <Text testID="8:24" style={styles.fieldLabel}>
              {`Medication name`}
            </Text>
            <View testID="8:25" style={styles.inputMedName}>
              <Text testID="8:26" style={styles.placeholder}>
                {`Enter medication name`}
              </Text>
            </View>
          </View>
          <View testID="8:27" style={styles.fieldGroupDosage}>
            <Text testID="8:28" style={styles.fieldLabel2}>
              {`Dosage`}
            </Text>
            <View testID="8:29" style={styles.dosageRow}>
              <View testID="8:30" style={styles.dosageAmount}>
                <Text testID="8:31" style={styles.amountValue}>
                  {`1`}
                </Text>
              </View>
              <View testID="8:32" style={styles.dosageUnit}>
                <Text testID="8:33" style={styles.unitValue}>
                  {`Tablet`}
                </Text>
                <ChevronDownWrapper/>
              </View>
            </View>
          </View>
          <View testID="8:36" style={styles.fieldGroupTiming}>
            <Text testID="8:37" style={styles.fieldLabel3}>
              {`When do you take it?`}
            </Text>
            <View testID="8:38" style={styles.chipsContainer}>
              <View testID="8:39" style={styles.chipSelected}>
                <Text testID="8:40" style={styles.chipText}>
                  {`After waking up`}
                </Text>
              </View>
              <View testID="8:41" style={styles.chipUnselected1}>
                <Text testID="8:42" style={styles.chipText2}>
                  {`After breakfast`}
                </Text>
              </View>
              <View testID="8:43" style={styles.chipUnselected2}>
                <Text testID="8:44" style={styles.chipText3}>
                  {`After lunch`}
                </Text>
              </View>
              <View testID="8:45" style={styles.chipUnselected3}>
                <Text testID="8:46" style={styles.chipText4}>
                  {`After dinner`}
                </Text>
              </View>
              <View testID="8:47" style={styles.chipUnselected4}>
                <Text testID="8:48" style={styles.chipText5}>
                  {`Before sleeping`}
                </Text>
              </View>
              <View testID="8:49" style={styles.chipAction}>
                <Text testID="8:50" style={styles.chipText6}>
                  {`+ Add a time`}
                </Text>
              </View>
            </View>
          </View>
          <View testID="8:51" style={styles.fieldGroupFrequency}>
            <Text testID="8:52" style={styles.fieldLabel4}>
              {`How often?`}
            </Text>
            <View testID="8:53" style={styles.dropdownFrequency}>
              <Text testID="8:54" style={styles.frequencyValue}>
                {`Every day`}
              </Text>
              <ChevronDownWrapper2/>
            </View>
          </View>
          <View testID="8:57" style={styles.fieldGroupDuration}>
            <Text testID="8:58" style={styles.fieldLabel5}>
              {`How long?`}
            </Text>
            <View testID="8:59" style={styles.dropdownDuration}>
              <Text testID="8:60" style={styles.durationValue}>
                {`7 days`}
              </Text>
              <ChevronDownWrapper3/>
            </View>
          </View>
        </View>
        <View testID="8:63" style={styles.actionsBlock}>
          <View testID="8:64" style={styles.primaryButton}>
            <Text testID="8:65" style={styles.buttonLabel}>
              {`Add medication`}
            </Text>
          </View>
        </View>
      </View>
      <View testID="8:66" style={styles.homeIndicator}>
        <View testID="8:67" style={styles.indicator}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create(theme => ({
  root: {
    width: 393,
    minHeight: 852,
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(244, 245, 246, 1)',
  },
  time: {
    color: 'rgba(17, 24, 39, 1)',
    fontFamily: 'Manrope',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '600',
  },
  statusBar: {
    flexDirection: 'row',
    height: 44,
    paddingTop: 0,
    paddingLeft: 24,
    paddingBottom: 0,
    paddingRight: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    rowGap: 6,
    columnGap: 6,
  },
  navigationBar: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingLeft: 24,
    paddingBottom: 12,
    paddingRight: 24,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  backButton: {
    flexDirection: 'row',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    shadowColor: 'rgba(0, 0, 0, 0.0313725508749485)',
    shadowRadius: 8,
    shadowOffset: {"width":0,"height":2},
  },
  title: {
    alignSelf: 'stretch',
    color: 'rgba(17, 24, 39, 1)',
    fontFamily: 'Manrope',
    fontSize: 28,
    fontStyle: 'normal',
    fontWeight: '800',
    letterSpacing: 'undefined',
  },
  subtitle: {
    alignSelf: 'stretch',
    color: 'rgba(107, 114, 128, 1)',
    fontFamily: 'Manrope',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  mainContent: {
    paddingTop: 8,
    paddingLeft: 24,
    paddingBottom: 20,
    paddingRight: 24,
    flexDirection: 'column',
    alignItems: 'flex-start',
    rowGap: 24,
    columnGap: 24,
    alignSelf: 'stretch',
  },
  headerText: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    rowGap: 6,
    columnGap: 6,
    alignSelf: 'stretch',
  },
  fieldLabel: {
    alignSelf: 'stretch',
    color: 'rgba(107, 114, 128, 1)',
    fontFamily: 'Manrope',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '700',
    letterSpacing: 'undefined',
    textTransform: 'uppercase',
  },
  placeholder: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    color: 'rgba(156, 163, 175, 1)',
    fontFamily: 'Manrope',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  formStack: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    rowGap: 20,
    columnGap: 20,
    alignSelf: 'stretch',
  },
  fieldGroupName: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    rowGap: 8,
    columnGap: 8,
    alignSelf: 'stretch',
  },
  inputMedName: {
    flexDirection: 'row',
    height: 52,
    paddingTop: 0,
    paddingLeft: 16,
    paddingBottom: 0,
    paddingRight: 16,
    alignItems: 'center',
    alignSelf: 'stretch',
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    shadowColor: 'rgba(0, 0, 0, 0.0313725508749485)',
    shadowRadius: 8,
    shadowOffset: {"width":0,"height":2},
  },
  fieldLabel2: {
    alignSelf: 'stretch',
    color: 'rgba(107, 114, 128, 1)',
    fontFamily: 'Manrope',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '700',
    letterSpacing: 'undefined',
    textTransform: 'uppercase',
  },
  amountValue: {
    color: 'rgba(17, 24, 39, 1)',
    fontFamily: 'Manrope',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  fieldGroupDosage: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    rowGap: 8,
    columnGap: 8,
    alignSelf: 'stretch',
  },
  dosageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    rowGap: 12,
    columnGap: 12,
    alignSelf: 'stretch',
  },
  dosageAmount: {
    flexDirection: 'row',
    width: 80,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    shadowColor: 'rgba(0, 0, 0, 0.0313725508749485)',
    shadowRadius: 8,
    shadowOffset: {"width":0,"height":2},
  },
  unitValue: {
    color: 'rgba(17, 24, 39, 1)',
    fontFamily: 'Manrope',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  dosageUnit: {
    flexDirection: 'row',
    height: 52,
    paddingTop: 0,
    paddingLeft: 16,
    paddingBottom: 0,
    paddingRight: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    shadowColor: 'rgba(0, 0, 0, 0.0313725508749485)',
    shadowRadius: 8,
    shadowOffset: {"width":0,"height":2},
  },
  fieldLabel3: {
    alignSelf: 'stretch',
    color: 'rgba(107, 114, 128, 1)',
    fontFamily: 'Manrope',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '700',
    letterSpacing: 'undefined',
    textTransform: 'uppercase',
  },
  chipText: {
    color: 'rgba(255, 255, 255, 1)',
    fontFamily: 'Manrope',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
  },
  fieldGroupTiming: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    rowGap: 8,
    columnGap: 8,
    alignSelf: 'stretch',
  },
  chipsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    rowGap: 8,
    columnGap: 8,
    alignSelf: 'stretch',
    flexWrap: 'wrap',
  },
  chipSelected: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 16,
    paddingBottom: 10,
    paddingRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'rgba(13, 148, 136, 1)',
    shadowColor: 'rgba(13, 148, 136, 0.14901961386203766)',
    shadowRadius: 6,
    shadowOffset: {"width":0,"height":3},
  },
  chipText2: {
    color: 'rgba(17, 24, 39, 1)',
    fontFamily: 'Manrope',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  chipUnselected1: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 16,
    paddingBottom: 10,
    paddingRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    shadowColor: 'rgba(0, 0, 0, 0.0313725508749485)',
    shadowRadius: 8,
    shadowOffset: {"width":0,"height":2},
  },
  chipText3: {
    color: 'rgba(17, 24, 39, 1)',
    fontFamily: 'Manrope',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  chipUnselected2: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 16,
    paddingBottom: 10,
    paddingRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    shadowColor: 'rgba(0, 0, 0, 0.0313725508749485)',
    shadowRadius: 8,
    shadowOffset: {"width":0,"height":2},
  },
  chipText4: {
    color: 'rgba(17, 24, 39, 1)',
    fontFamily: 'Manrope',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  chipUnselected3: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 16,
    paddingBottom: 10,
    paddingRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    shadowColor: 'rgba(0, 0, 0, 0.0313725508749485)',
    shadowRadius: 8,
    shadowOffset: {"width":0,"height":2},
  },
  chipText5: {
    color: 'rgba(17, 24, 39, 1)',
    fontFamily: 'Manrope',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  chipUnselected4: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 16,
    paddingBottom: 10,
    paddingRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    shadowColor: 'rgba(0, 0, 0, 0.0313725508749485)',
    shadowRadius: 8,
    shadowOffset: {"width":0,"height":2},
  },
  chipText6: {
    color: 'rgba(13, 148, 136, 1)',
    fontFamily: 'Manrope',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
  },
  chipAction: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 16,
    paddingBottom: 10,
    paddingRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(13, 148, 136, 1)',
    backgroundColor: 'rgba(240, 253, 250, 1)',
  },
  fieldLabel4: {
    alignSelf: 'stretch',
    color: 'rgba(107, 114, 128, 1)',
    fontFamily: 'Manrope',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '700',
    letterSpacing: 'undefined',
    textTransform: 'uppercase',
  },
  frequencyValue: {
    color: 'rgba(17, 24, 39, 1)',
    fontFamily: 'Manrope',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  fieldGroupFrequency: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    rowGap: 8,
    columnGap: 8,
    alignSelf: 'stretch',
  },
  dropdownFrequency: {
    flexDirection: 'row',
    height: 52,
    paddingTop: 0,
    paddingLeft: 16,
    paddingBottom: 0,
    paddingRight: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    shadowColor: 'rgba(0, 0, 0, 0.0313725508749485)',
    shadowRadius: 8,
    shadowOffset: {"width":0,"height":2},
  },
  fieldLabel5: {
    alignSelf: 'stretch',
    color: 'rgba(107, 114, 128, 1)',
    fontFamily: 'Manrope',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '700',
    letterSpacing: 'undefined',
    textTransform: 'uppercase',
  },
  durationValue: {
    color: 'rgba(17, 24, 39, 1)',
    fontFamily: 'Manrope',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  fieldGroupDuration: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    rowGap: 8,
    columnGap: 8,
    alignSelf: 'stretch',
  },
  dropdownDuration: {
    flexDirection: 'row',
    height: 52,
    paddingTop: 0,
    paddingLeft: 16,
    paddingBottom: 0,
    paddingRight: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    shadowColor: 'rgba(0, 0, 0, 0.0313725508749485)',
    shadowRadius: 8,
    shadowOffset: {"width":0,"height":2},
  },
  buttonLabel: {
    color: 'rgba(255, 255, 255, 1)',
    fontFamily: 'Manrope',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  actionsBlock: {
    paddingTop: 16,
    paddingLeft: 0,
    paddingBottom: 8,
    paddingRight: 0,
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
  },
  primaryButton: {
    flexDirection: 'row',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    backgroundColor: 'rgba(13, 148, 136, 1)',
    shadowColor: 'rgba(13, 148, 136, 0.20000000298023224)',
    shadowRadius: 12,
    shadowOffset: {"width":0,"height":4},
  },
  indicator: {
    width: 134,
    height: 5,
    flexShrink: 0,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    opacity: 0.15,
    backgroundColor: 'rgba(17, 24, 39, 1)',
  },
  homeIndicator: {
    height: 34,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
}));
