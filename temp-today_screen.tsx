import { Image } from 'react-exo/image';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import Battery from './assets/battery.svg';
import CellularSignal from './assets/cellularsignal.svg';
import ChevronDown from './assets/chevrondown.svg';
import remainingDose from './assets/remainingdose.png';
import remainingDose2 from './assets/remainingdose2.png';
import remainingDose3 from './assets/remainingdose3.png';
import remainingDose4 from './assets/remainingdose4.png';
import remainingDose5 from './assets/remainingdose5.png';
import remainingDose6 from './assets/remainingdose6.png';
import TabSymbol from './assets/tabsymbol.svg';
import TabSymbol2 from './assets/tabsymbol2.svg';
import TabSymbol3 from './assets/tabsymbol3.svg';
import TabSymbol4 from './assets/tabsymbol4.svg';
import takenDose from './assets/takendose.png';
import WiFi from './assets/wifi.svg';

import type { StyleProp, ViewStyle } from 'react-native';

export interface TodayDoseProgressProps {
  /** Used to override the default root style. */
  style?: StyleProp<ViewStyle>,
  /** Used to locate this view in end-to-end tests. */
  testID?: string,
}

export function TodayDoseProgress(props: TodayDoseProgressProps) {
  return (
    <View testID={props.testID ?? "49:183"} style={[styles.root, props.style]}>
      <View testID="51:118" style={styles.todayContent}>
        <View testID="51:119" style={styles.morningAndProgress}>
          <View testID="51:120" style={styles.statusBar}>
            <Text testID="51:121" style={styles.time}>
              {`9:41`}
            </Text>
            <View testID="51:122" style={styles.deviceStatus}>
              <CellularSignal/>
              <WiFi/>
              <Battery/>
            </View>
          </View>
          <View testID="51:126" style={styles.greeting2}>
            <Text testID="51:127" style={styles.greeting}>
              {`Good morning`}
            </Text>
            <Text testID="51:128" style={styles.date}>
              {`Monday, October 5`}
            </Text>
          </View>
        </View>
        <View testID="51:129" style={styles.medicationSchedule}>
          <Text testID="51:130" style={styles.scheduleLabel}>
            {`Your medications`}
          </Text>
          <View testID="51:131" style={styles.medicationList}>
            <View testID="51:132" style={styles.medicationEntry}>
              <View testID="51:133" style={styles.medicationRow}>
                <Text testID="51:134" style={styles.medicationName}>
                  {`Metformin`}
                </Text>
                <Text testID="51:135" style={styles.dosageAndTiming}>
                  {`500 mg · After breakfast & dinner`}
                </Text>
                <View testID="51:136" style={styles.doseProgressAndAction}>
                  <View testID="51:137" style={styles.scheduleAndProgress}>
                    <Text testID="51:138" style={styles.doseSchedule}>
                      {`9:00 AM · Overdue by 41 min`}
                    </Text>
                    <View testID="51:139" style={styles.medicationDoseProgress}>
                      <View testID="51:140" style={styles.doseDots}>
                        <Image url={remainingDose} width={8} height={8}/>
                        <Image url={remainingDose2} width={8} height={8}/>
                      </View>
                      <Text testID="51:143" style={styles.doseCount}>
                        {`0 of 2`}
                      </Text>
                    </View>
                  </View>
                  <View testID="51:144" style={styles.takeNextDose}>
                    <Text testID="51:145" style={styles.actionLabel}>
                      {`Take`}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View testID="51:146" style={styles.medicationEntry2}>
              <View testID="51:147" style={styles.rowSeparator}>
                <View testID="51:148" style={styles.divider}/>
              </View>
              <View testID="51:149" style={styles.medicationRow2}>
                <Text testID="51:150" style={styles.medicationName2}>
                  {`Carbidopa / levodopa`}
                </Text>
                <Text testID="51:151" style={styles.dosageAndTiming2}>
                  {`100/25 mg · Every 4 hours`}
                </Text>
                <View testID="51:152" style={styles.doseProgressAndAction2}>
                  <View testID="51:153" style={styles.scheduleAndProgress2}>
                    <Text testID="51:154" style={styles.doseSchedule2}>
                      {`Next · 10:00 AM`}
                    </Text>
                    <View testID="51:155" style={styles.medicationDoseProgress2}>
                      <View testID="51:156" style={styles.doseDots2}>
                        <Image url={takenDose} width={8} height={8}/>
                        <Image url={remainingDose3} width={8} height={8}/>
                        <Image url={remainingDose4} width={8} height={8}/>
                        <Image url={remainingDose5} width={8} height={8}/>
                      </View>
                      <Text testID="51:161" style={styles.doseCount2}>
                        {`1 of 4`}
                      </Text>
                    </View>
                  </View>
                  <View testID="51:162" style={styles.takeNextDose2}>
                    <Text testID="51:163" style={styles.actionLabel2}>
                      {`Take`}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View testID="51:164" style={styles.medicationEntry3}>
              <View testID="51:165" style={styles.rowSeparator2}>
                <View testID="51:166" style={styles.divider2}/>
              </View>
              <View testID="51:167" style={styles.medicationRow3}>
                <Text testID="51:168" style={styles.medicationName3}>
                  {`Vitamin D3`}
                </Text>
                <Text testID="51:169" style={styles.dosageAndTiming3}>
                  {`1,000 IU · After lunch`}
                </Text>
                <View testID="51:170" style={styles.doseProgressAndAction3}>
                  <View testID="51:171" style={styles.scheduleAndProgress3}>
                    <Text testID="51:172" style={styles.doseSchedule3}>
                      {`Next · 12:30 PM`}
                    </Text>
                    <View testID="51:173" style={styles.medicationDoseProgress3}>
                      <View testID="51:174" style={styles.doseDots3}>
                        <Image url={remainingDose6} width={8} height={8}/>
                      </View>
                      <Text testID="51:176" style={styles.doseCount3}>
                        {`0 of 1`}
                      </Text>
                    </View>
                  </View>
                  <Text testID="51:177" style={styles.upcomingState}>
                    {`Later today`}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View testID="51:178" style={styles.completedMedicationsSection}>
            <Text testID="51:179" style={styles.completedLabel}>
              {`Completed medications`}
            </Text>
            <View testID="51:180" style={styles.collapsedHeader}>
              <Text testID="51:181" style={styles.collapsedText}>
                {`1 medication completed today`}
              </Text>
              <ChevronDown/>
            </View>
          </View>
          <View testID="51:183" style={styles.addMedication}>
            <Text testID="51:184" style={styles.addMedicationLabel}>
              {`+ Add medication`}
            </Text>
          </View>
        </View>
      </View>
      <View testID="51:185" style={styles.bottomNavigation}>
        <View testID="51:186" style={styles.navigationTabs}>
          <View testID="51:187" style={styles.navigationItem}>
            <View testID="51:188" style={styles.navigationIcon}>
              <TabSymbol/>
            </View>
            <Text testID="51:190" style={styles.tabLabel}>
              {`Today`}
            </Text>
          </View>
          <View testID="51:191" style={styles.navigationItem2}>
            <View testID="51:192" style={styles.navigationIcon2}>
              <TabSymbol2/>
            </View>
            <Text testID="51:194" style={styles.tabLabel2}>
              {`Meds`}
            </Text>
          </View>
          <View testID="51:195" style={styles.navigationItem3}>
            <View testID="51:196" style={styles.navigationIcon3}>
              <TabSymbol3/>
            </View>
            <Text testID="51:198" style={styles.tabLabel3}>
              {`History`}
            </Text>
          </View>
          <View testID="51:199" style={styles.navigationItem4}>
            <View testID="51:200" style={styles.navigationIcon4}>
              <TabSymbol4/>
            </View>
            <Text testID="51:202" style={styles.tabLabel4}>
              {`Settings`}
            </Text>
          </View>
        </View>
        <View testID="51:203" style={styles.homeIndicator}>
          <View testID="51:204" style={styles.indicator}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create(theme => ({
  root: {
    width: 393,
    height: 852,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 1)',
    backgroundColor: 'rgba(244, 245, 246, 1)',
  },
  time: {
    color: 'rgba(17, 24, 39, 1)',
    fontFamily: 'Manrope',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '600',
  },
  todayContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    alignSelf: 'stretch',
  },
  morningAndProgress: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
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
  deviceStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    rowGap: 6,
    columnGap: 6,
  },
  greeting: {
    alignSelf: 'stretch',
    color: 'rgba(17, 24, 39, 1)',
    fontFamily: 'Manrope',
    fontSize: 28,
    fontStyle: 'normal',
    fontWeight: '800',
    lineHeight: 36,
    letterSpacing: 'undefined',
  },
  date: {
    alignSelf: 'stretch',
    color: 'rgba(107, 114, 128, 1)',
    fontFamily: 'Manrope',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 20,
  },
  greeting2: {
    paddingTop: 20,
    paddingLeft: 24,
    paddingBottom: 26,
    paddingRight: 24,
    flexDirection: 'column',
    alignItems: 'flex-start',
    rowGap: 6,
    columnGap: 6,
    alignSelf: 'stretch',
  },
  scheduleLabel: {
    alignSelf: 'stretch',
    color: 'rgba(107, 114, 128, 1)',
    fontFamily: 'Manrope',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 18,
  },
  medicationName: {
    alignSelf: 'stretch',
    color: 'rgba(17, 24, 39, 1)',
    fontFamily: 'Manrope',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 22,
  },
  dosageAndTiming: {
    alignSelf: 'stretch',
    color: 'rgba(107, 114, 128, 1)',
    fontFamily: 'Manrope',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 18,
  },
  doseSchedule: {
    alignSelf: 'stretch',
    color: 'rgba(154, 102, 80, 1)',
    fontFamily: 'Manrope',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 17,
  },
  medicationSchedule: {
    paddingTop: 0,
    paddingLeft: 24,
    paddingBottom: 0,
    paddingRight: 24,
    flexDirection: 'column',
    alignItems: 'flex-start',
    rowGap: 12,
    columnGap: 12,
    alignSelf: 'stretch',
  },
  medicationList: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  medicationEntry: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
  },
  medicationRow: {
    height: 110,
    paddingTop: 13,
    paddingLeft: 16,
    paddingBottom: 13,
    paddingRight: 16,
    flexDirection: 'column',
    alignItems: 'flex-start',
    rowGap: 4,
    columnGap: 4,
    alignSelf: 'stretch',
  },
  doseProgressAndAction: {
    flexDirection: 'row',
    height: 36,
    alignItems: 'center',
    rowGap: 12,
    columnGap: 12,
    flexShrink: 0,
    alignSelf: 'stretch',
  },
  scheduleAndProgress: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    rowGap: 4,
    columnGap: 4,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
  },
  medicationDoseProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
  },
  doseDots: {
    flexDirection: 'row',
    alignItems: 'center',
    rowGap: 6,
    columnGap: 6,
  },
  doseCount: {
    color: 'rgba(107, 114, 128, 1)',
    fontFamily: 'Manrope',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 15,
  },
  actionLabel: {
    color: 'rgba(255, 255, 255, 1)',
    fontFamily: 'Manrope',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  takeNextDose: {
    flexDirection: 'row',
    width: 58,
    height: 27,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'rgba(13, 148, 136, 1)',
  },
  divider: {
    height: 1,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    backgroundColor: 'rgba(240, 241, 243, 1)',
  },
  medicationEntry2: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
  },
  rowSeparator: {
    flexDirection: 'row',
    paddingTop: 0,
    paddingLeft: 16,
    paddingBottom: 0,
    paddingRight: 16,
    alignItems: 'flex-start',
    alignSelf: 'stretch',
  },
  medicationName2: {
    alignSelf: 'stretch',
    color: 'rgba(17, 24, 39, 1)',
    fontFamily: 'Manrope',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 22,
  },
  dosageAndTiming2: {
    alignSelf: 'stretch',
    color: 'rgba(107, 114, 128, 1)',
    fontFamily: 'Manrope',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 18,
  },
  doseSchedule2: {
    alignSelf: 'stretch',
    color: 'rgba(13, 148, 136, 1)',
    fontFamily: 'Manrope',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 17,
  },
  medicationRow2: {
    height: 110,
    paddingTop: 13,
    paddingLeft: 16,
    paddingBottom: 13,
    paddingRight: 16,
    flexDirection: 'column',
    alignItems: 'flex-start',
    rowGap: 4,
    columnGap: 4,
    alignSelf: 'stretch',
  },
  doseProgressAndAction2: {
    flexDirection: 'row',
    height: 36,
    alignItems: 'center',
    rowGap: 12,
    columnGap: 12,
    flexShrink: 0,
    alignSelf: 'stretch',
  },
  scheduleAndProgress2: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    rowGap: 4,
    columnGap: 4,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
  },
  medicationDoseProgress2: {
    flexDirection: 'row',
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
  },
  doseDots2: {
    flexDirection: 'row',
    alignItems: 'center',
    rowGap: 6,
    columnGap: 6,
  },
  doseCount2: {
    color: 'rgba(107, 114, 128, 1)',
    fontFamily: 'Manrope',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 15,
  },
  actionLabel2: {
    color: 'rgba(13, 148, 136, 1)',
    fontFamily: 'Manrope',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  takeNextDose2: {
    flexDirection: 'row',
    width: 58,
    height: 27,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'rgba(240, 253, 250, 1)',
  },
  divider2: {
    height: 1,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    backgroundColor: 'rgba(240, 241, 243, 1)',
  },
  medicationEntry3: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
  },
  rowSeparator2: {
    flexDirection: 'row',
    paddingTop: 0,
    paddingLeft: 16,
    paddingBottom: 0,
    paddingRight: 16,
    alignItems: 'flex-start',
    alignSelf: 'stretch',
  },
  medicationName3: {
    alignSelf: 'stretch',
    color: 'rgba(17, 24, 39, 1)',
    fontFamily: 'Manrope',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 22,
  },
  dosageAndTiming3: {
    alignSelf: 'stretch',
    color: 'rgba(107, 114, 128, 1)',
    fontFamily: 'Manrope',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 18,
  },
  doseSchedule3: {
    alignSelf: 'stretch',
    color: 'rgba(107, 114, 128, 1)',
    fontFamily: 'Manrope',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 17,
  },
  medicationRow3: {
    height: 110,
    paddingTop: 13,
    paddingLeft: 16,
    paddingBottom: 13,
    paddingRight: 16,
    flexDirection: 'column',
    alignItems: 'flex-start',
    rowGap: 4,
    columnGap: 4,
    alignSelf: 'stretch',
  },
  doseProgressAndAction3: {
    flexDirection: 'row',
    height: 36,
    alignItems: 'center',
    rowGap: 12,
    columnGap: 12,
    flexShrink: 0,
    alignSelf: 'stretch',
  },
  scheduleAndProgress3: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    rowGap: 4,
    columnGap: 4,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
  },
  medicationDoseProgress3: {
    flexDirection: 'row',
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
  },
  doseDots3: {
    flexDirection: 'row',
    alignItems: 'center',
    rowGap: 6,
    columnGap: 6,
  },
  doseCount3: {
    color: 'rgba(107, 114, 128, 1)',
    fontFamily: 'Manrope',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 15,
  },
  upcomingState: {
    color: 'rgba(107, 114, 128, 1)',
    fontFamily: 'Manrope',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  completedLabel: {
    alignSelf: 'stretch',
    color: 'rgba(107, 114, 128, 1)',
    fontFamily: 'Manrope',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 18,
  },
  collapsedText: {
    color: 'rgba(17, 24, 39, 1)',
    fontFamily: 'Manrope',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
  },
  completedMedicationsSection: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    rowGap: 8,
    columnGap: 8,
    alignSelf: 'stretch',
  },
  collapsedHeader: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingLeft: 16,
    paddingBottom: 12,
    paddingRight: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  addMedicationLabel: {
    color: 'rgba(13, 148, 136, 1)',
    fontFamily: 'Manrope',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
  },
  addMedication: {
    flexDirection: 'row',
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  bottomNavigation: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  navigationTabs: {
    flexDirection: 'row',
    height: 56,
    paddingTop: 8,
    paddingLeft: 12,
    paddingBottom: 4,
    paddingRight: 12,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
  },
  navigationItem: {
    width: 80,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 4,
    columnGap: 4,
    alignSelf: 'stretch',
  },
  navigationIcon: {
    flexDirection: 'row',
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    color: 'rgba(13, 148, 136, 1)',
    fontFamily: 'Manrope',
    fontSize: 11,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  navigationItem2: {
    width: 80,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 4,
    columnGap: 4,
    alignSelf: 'stretch',
  },
  navigationIcon2: {
    flexDirection: 'row',
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel2: {
    color: 'rgba(107, 114, 128, 1)',
    fontFamily: 'Manrope',
    fontSize: 11,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  navigationItem3: {
    width: 80,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 4,
    columnGap: 4,
    alignSelf: 'stretch',
  },
  navigationIcon3: {
    flexDirection: 'row',
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel3: {
    color: 'rgba(107, 114, 128, 1)',
    fontFamily: 'Manrope',
    fontSize: 11,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  navigationItem4: {
    width: 80,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 4,
    columnGap: 4,
    alignSelf: 'stretch',
  },
  navigationIcon4: {
    flexDirection: 'row',
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel4: {
    color: 'rgba(107, 114, 128, 1)',
    fontFamily: 'Manrope',
    fontSize: 11,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  indicator: {
    width: 134,
    height: 5,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    backgroundColor: 'rgba(17, 24, 39, 0.14901961386203766)',
  },
  homeIndicator: {
    flexDirection: 'row',
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
}));
