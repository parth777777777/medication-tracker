import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import {
  addMedicationWithDoseRules,
  type DoseRuleInput,
} from '../db/medications';
import { Colors } from '../constants/theme';

const timingOptions = [
  { value: 'wake_up', label: 'After waking up' },
  { value: 'after_breakfast', label: 'After breakfast' },
  { value: 'after_lunch', label: 'After lunch' },
  { value: 'after_dinner', label: 'After dinner' },
  { value: 'before_sleep', label: 'Before sleeping' },
] as const;

const unitOptions = ['tablet', 'capsule', 'mg', 'mL'] as const;
const weekdayOptions = [
  { value: 0, label: 'Sun' },
  { value: 1, label: 'Mon' },
  { value: 2, label: 'Tue' },
  { value: 3, label: 'Wed' },
  { value: 4, label: 'Thu' },
  { value: 5, label: 'Fri' },
  { value: 6, label: 'Sat' },
] as const;
const durationOptions = [7, 14, 30] as const;

function getTodayDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function addDays(dateString: string, days: number) {
  const date = new Date(`${dateString}T12:00:00`);
  date.setDate(date.getDate() + days);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export default function AddMedicationScreen() {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('1');
  const [unit, setUnit] = useState<string>('tablet');
  const [unitPickerOpen, setUnitPickerOpen] = useState(false);
  const [selectedTimings, setSelectedTimings] = useState<string[]>([
    'wake_up',
  ]);
  const [customTime, setCustomTime] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'specific-days'>(
    'daily'
  );
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [durationDays, setDurationDays] = useState<number | null>(7);
  const [saving, setSaving] = useState(false);

  function toggleTiming(value: string) {
    setSelectedTimings((current) =>
      current.includes(value)
        ? current.filter((timing) => timing !== value)
        : [...current, value]
    );
  }

  function toggleDay(value: number) {
    setSelectedDays((current) =>
      current.includes(value)
        ? current.filter((day) => day !== value)
        : [...current, value]
    );
  }

  function validate() {
    if (!name.trim()) {
      Alert.alert('Medication name required', 'Enter the medication name.');
      return false;
    }

    const amount = Number(dosage);
    if (!dosage.trim() || !Number.isFinite(amount) || amount <= 0) {
      Alert.alert('Invalid dosage', 'Enter a dosage greater than zero.');
      return false;
    }

    if (selectedTimings.length === 0) {
      Alert.alert('Choose a time', 'Select at least one time to take it.');
      return false;
    }

    if (
      selectedTimings.includes('custom') &&
      !/^([01]\d|2[0-3]):[0-5]\d$/.test(customTime)
    ) {
      Alert.alert('Invalid time', 'Enter a time in 24-hour format, like 08:30.');
      return false;
    }

    if (frequency === 'specific-days' && selectedDays.length === 0) {
      Alert.alert('Choose days', 'Select at least one day of the week.');
      return false;
    }

    return true;
  }

  async function handleSave() {
    if (saving || !validate()) return;

    setSaving(true);

    const startDate = getTodayDate();
    const dayValues = frequency === 'daily' ? [null] : selectedDays;
    const selectedTimingRules: DoseRuleInput[] = selectedTimings.flatMap(
      (timing, index) =>
        dayValues.map((dayOfWeek) => ({
          timing_label: timing,
          custom_time: timing === 'custom' ? customTime : undefined,
          day_of_week: dayOfWeek,
          sort_order: index,
        }))
    );

    try {
      await addMedicationWithDoseRules(
        {
          name: name.trim(),
          dosage_amount: Number(dosage),
          unit,
          dosing_mode: 'fixed_times',
          start_date: startDate,
          end_date:
            durationDays === null
              ? undefined
              : addDays(startDate, durationDays - 1),
        },
        selectedTimingRules
      );

      Alert.alert('Medication added', `${name.trim()} has been saved.`, [
        { text: 'Done', onPress: () => router.back() },
      ]);
    } catch (error) {
      console.error('Failed to save medication:', error);
      Alert.alert(
        'Could not save medication',
        'Please try again. Your medication was not saved.'
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>‹</Text>
          </Pressable>

          <View style={styles.header}>
            <Text style={styles.title}>Add medication</Text>
            <Text style={styles.subtitle}>
              Set up your medication and when you need to take it.
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Medication name</Text>
              <TextInput
                accessibilityLabel="Medication name"
                autoCapitalize="words"
                onChangeText={setName}
                placeholder="Enter medication name"
                placeholderTextColor={colors.placeholder}
                returnKeyType="next"
                style={styles.textInput}
                value={name}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Dosage</Text>
              <View style={styles.dosageRow}>
                <TextInput
                  accessibilityLabel="Dosage amount"
                  keyboardType="decimal-pad"
                  onChangeText={setDosage}
                  style={[styles.textInput, styles.dosageInput]}
                  value={dosage}
                />
                <View style={styles.unitContainer}>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`Dosage unit: ${unit}`}
                    accessibilityState={{ expanded: unitPickerOpen }}
                    onPress={() => setUnitPickerOpen((open) => !open)}
                    style={styles.dropdown}
                  >
                    <Text style={styles.valueText}>{unit}</Text>
                    <Text style={styles.chevron}>⌄</Text>
                  </Pressable>
                  {unitPickerOpen && (
                    <View style={styles.unitOptions}>
                      {unitOptions.map((option) => (
                        <Pressable
                          accessibilityRole="button"
                          key={option}
                          onPress={() => {
                            setUnit(option);
                            setUnitPickerOpen(false);
                          }}
                          style={styles.unitOption}
                        >
                          <Text style={styles.valueText}>{option}</Text>
                        </Pressable>
                      ))}
                    </View>
                  )}
                </View>
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>When do you take it?</Text>
              <View style={styles.chipList}>
                {timingOptions.map((option) => (
                  <ChoiceChip
                    key={option.value}
                    label={option.label}
                    selected={selectedTimings.includes(option.value)}
                    onPress={() => toggleTiming(option.value)}
                  />
                ))}
                <ChoiceChip
                  label="+ Add a time"
                  selected={selectedTimings.includes('custom')}
                  onPress={() => toggleTiming('custom')}
                  action
                />
              </View>
              {selectedTimings.includes('custom') && (
                <TextInput
                  accessibilityLabel="Custom medication time"
                  keyboardType="numbers-and-punctuation"
                  onChangeText={setCustomTime}
                  placeholder="Time (HH:MM)"
                  placeholderTextColor={colors.placeholder}
                  style={styles.textInput}
                  value={customTime}
                />
              )}
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>How often?</Text>
              <View style={styles.chipList}>
                <ChoiceChip
                  label="Every day"
                  selected={frequency === 'daily'}
                  onPress={() => setFrequency('daily')}
                />
                <ChoiceChip
                  label="Choose days"
                  selected={frequency === 'specific-days'}
                  onPress={() => setFrequency('specific-days')}
                />
              </View>
              {frequency === 'specific-days' && (
                <View style={styles.chipList}>
                  {weekdayOptions.map((day) => (
                    <ChoiceChip
                      key={day.value}
                      label={day.label}
                      selected={selectedDays.includes(day.value)}
                      onPress={() => toggleDay(day.value)}
                    />
                  ))}
                </View>
              )}
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>How long?</Text>
              <View style={styles.chipList}>
                {durationOptions.map((days) => (
                  <ChoiceChip
                    key={days}
                    label={`${days} days`}
                    selected={durationDays === days}
                    onPress={() => setDurationDays(days)}
                  />
                ))}
                <ChoiceChip
                  label="Ongoing"
                  selected={durationDays === null}
                  onPress={() => setDurationDays(null)}
                />
              </View>
            </View>
          </View>

          <Pressable
            accessibilityRole="button"
            disabled={saving}
            onPress={handleSave}
            style={({ pressed }) => [
              styles.submitButton,
              pressed && !saving && styles.submitButtonPressed,
              saving && styles.submitButtonDisabled,
            ]}
          >
            <Text style={styles.submitButtonText}>
              {saving ? 'Saving…' : 'Add medication'}
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function ChoiceChip({
  label,
  selected,
  onPress,
  action = false,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
  action?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[
        styles.chip,
        action && styles.actionChip,
        selected && styles.selectedChip,
      ]}
    >
      <Text
        style={[
          styles.chipText,
          action && styles.actionChipText,
          selected && styles.selectedChipText,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const colors = Colors.light;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 28,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.backgroundElement,
    marginTop: 12,
    marginBottom: 20,
  },
  backButtonText: {
    color: colors.text,
    fontSize: 28,
    lineHeight: 32,
  },
  header: {
    gap: 6,
    marginBottom: 24,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
  },
  form: {
    gap: 20,
  },
  fieldGroup: {
    gap: 8,
  },
  fieldLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  textInput: {
    minHeight: 52,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: colors.backgroundElement,
    color: colors.text,
    fontSize: 15,
  },
  dosageRow: {
    flexDirection: 'row',
    gap: 12,
  },
  dosageInput: {
    width: 80,
    textAlign: 'center',
  },
  unitContainer: {
    flex: 1,
  },
  dropdown: {
    minHeight: 52,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: colors.backgroundElement,
  },
  valueText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '500',
  },
  chevron: {
    color: colors.textSecondary,
    fontSize: 20,
  },
  unitOptions: {
    position: 'absolute',
    zIndex: 1,
    top: 56,
    left: 0,
    right: 0,
    padding: 6,
    borderRadius: 12,
    backgroundColor: colors.backgroundElement,
    elevation: 4,
  },
  unitOption: {
    padding: 10,
  },
  chipList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    minHeight: 40,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.backgroundElement,
  },
  selectedChip: {
    backgroundColor: colors.primary,
  },
  chipText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '500',
  },
  selectedChipText: {
    color: colors.backgroundElement,
    fontWeight: '600',
  },
  actionChip: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  actionChipText: {
    color: colors.primary,
    fontWeight: '600',
  },
  submitButton: {
    minHeight: 56,
    marginTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: colors.primary,
  },
  submitButtonPressed: {
    opacity: 0.85,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: colors.backgroundElement,
    fontSize: 16,
    fontWeight: '700',
  },
});
