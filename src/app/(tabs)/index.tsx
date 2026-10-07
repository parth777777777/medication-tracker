import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Colors } from '@/constants/theme';
import { getTodayDoses, markDoseTaken, type TodayDose } from '@/db/today';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type MedicationSchedule = {
  medicationId: number;
  name: string;
  dosage: string;
  doses: TodayDose[];
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

function formatTime(time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

function formatTimingLabel(label: string | null) {
  if (!label) return 'Scheduled dose';

  const labels: Record<string, string> = {
    wake_up: 'After waking up',
    before_breakfast: 'Before breakfast',
    after_breakfast: 'After breakfast',
    before_lunch: 'Before lunch',
    after_lunch: 'After lunch',
    before_dinner: 'Before dinner',
    after_dinner: 'After dinner',
    before_sleep: 'Before sleeping',
    custom: 'Custom time',
    interval: 'Scheduled interval',
  };

  return labels[label] ?? label.replaceAll('_', ' ');
}

function groupDoses(doses: TodayDose[]): MedicationSchedule[] {
  const schedules = new Map<number, MedicationSchedule>();

  for (const dose of doses) {
    let schedule = schedules.get(dose.medication_id);
    if (!schedule) {
      schedule = {
        medicationId: dose.medication_id,
        name: dose.name,
        dosage: `${dose.dosage_amount} ${dose.unit}`,
        doses: [],
      };
      schedules.set(dose.medication_id, schedule);
    }
    schedule.doses.push(dose);
  }

  return [...schedules.values()];
}

export default function TodayScreen() {
  const [doses, setDoses] = useState<TodayDose[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [completedExpanded, setCompletedExpanded] = useState(false);
  const [takingDoseIds, setTakingDoseIds] = useState<number[]>([]);

  const loadDoses = useCallback(async () => {
    try {
      const todayDoses = await getTodayDoses();
      setDoses(todayDoses);
    } catch (error) {
      console.error('Failed to load today’s medication schedule:', error);
      Alert.alert('Could not load today', 'Please try again in a moment.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadDoses();
    }, [loadDoses])
  );

  const activeDoses = doses.filter((dose) => dose.status !== 'taken');
  const completedDoses = doses.filter((dose) => dose.status === 'taken');
  const schedules = groupDoses(activeDoses);
  const completedSchedules = groupDoses(completedDoses);
  const now = new Date();
  const greeting =
    now.getHours() < 12
      ? 'Good morning'
      : now.getHours() < 17
        ? 'Good afternoon'
        : 'Good evening';

  async function handleTakeDose(dose: TodayDose) {
    if (takingDoseIds.includes(dose.id)) return;

    setTakingDoseIds((current) => [...current, dose.id]);
    try {
      await markDoseTaken(dose.id);
      setDoses((current) =>
        current.map((item) =>
          item.id === dose.id ? { ...item, status: 'taken' } : item
        )
      );
    } catch (error) {
      console.error('Failed to mark dose as taken:', error);
      Alert.alert(
        'Could not update dose',
        'Please try again. The dose was not marked as taken.'
      );
    } finally {
      setTakingDoseIds((current) => current.filter((id) => id !== dose.id));
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F4F5F6]" edges={['top']}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="flex-grow pb-5"
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              setRefreshing(true);
              void loadDoses();
            }}
            refreshing={refreshing}
            tintColor={Colors.light.primary}
          />
        }
      >
        <View className="flex-grow pb-5">
          <View className="gap-1.5 px-6 pb-[26px] pt-5">
            <Text className="text-[28px] font-extrabold leading-9 text-[#111827]">
              {greeting}
            </Text>
            <Text className="text-sm font-medium leading-5 text-[#6B7280]">
              {formatDate(now)}
            </Text>
          </View>

          <View className="gap-3 px-6">
            <Text className="text-[13px] font-semibold leading-[18px] text-[#6B7280]">
              Your medications
            </Text>

            {loading ? (
              <View className="min-h-[110px] items-center justify-center gap-2 rounded-[14px] bg-white p-5">
                <ActivityIndicator color={Colors.light.primary} />
                <Text className="text-center text-sm text-[#6B7280]">
                  Loading your schedule…
                </Text>
              </View>
            ) : schedules.length === 0 ? (
              <View className="min-h-[110px] items-center justify-center gap-2 rounded-[14px] bg-white p-5">
                <Text className="text-center text-base font-bold text-[#111827]">
                  {completedSchedules.length > 0
                    ? 'You’re all caught up'
                    : 'No medications scheduled today'}
                </Text>
                <Text className="text-center text-sm text-[#6B7280]">
                  {completedSchedules.length > 0
                    ? 'Your scheduled doses are complete for today.'
                    : 'Add a medication to see its schedule here.'}
                </Text>
              </View>
            ) : (
              <View className="overflow-hidden rounded-[14px] bg-white">
                {schedules.map((schedule) => (
                  <View
                    key={schedule.medicationId}
                    className="px-4 pb-2.5 pt-3.5"
                  >
                    <Text className="text-base font-bold leading-[22px] text-[#111827]">
                      {schedule.name}
                    </Text>
                    <Text className="text-[13px] leading-[18px] text-[#6B7280]">
                      {schedule.dosage}
                    </Text>
                    <View className="mt-2">
                      {schedule.doses.map((dose) => (
                        <View
                          key={dose.id}
                          className="min-h-11 flex-row items-center justify-between border-t border-[#F0F1F3] py-1.5"
                        >
                          <View className="flex-1 flex-row items-center gap-[9px]">
                            <View
                              className={`h-2 w-2 rounded-full ${
                                dose.status === 'overdue'
                                  ? 'bg-[#9A6650]'
                                  : 'bg-[#0D9488]'
                              }`}
                            />
                            <View className="flex-1">
                              <Text
                                className={`text-xs font-semibold leading-[17px] ${
                                  dose.status === 'overdue'
                                    ? 'text-[#9A6650]'
                                    : 'text-[#0D9488]'
                                }`}
                              >
                                {formatTime(dose.scheduled_time)}
                              </Text>
                              <Text className="text-xs leading-[17px] text-[#6B7280]">
                                {formatTimingLabel(dose.timing_label)}
                                {dose.status === 'overdue' ? ' · Overdue' : ''}
                              </Text>
                            </View>
                          </View>
                          <Pressable
                            accessibilityRole="button"
                            accessibilityLabel={`Mark ${schedule.name} dose at ${formatTime(dose.scheduled_time)} as taken`}
                            className="min-h-[30px] min-w-[58px] items-center justify-center rounded-[10px] bg-[#0D9488] px-3 active:opacity-80 disabled:opacity-50"
                            disabled={takingDoseIds.includes(dose.id)}
                            onPress={() => void handleTakeDose(dose)}
                          >
                            <Text className="text-[13px] font-bold text-white">
                              {takingDoseIds.includes(dose.id) ? '…' : 'Take'}
                            </Text>
                          </Pressable>
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>

          {completedDoses.length > 0 && (
            <View className="mx-6 mt-[22px] gap-2">
              <Text className="text-[13px] font-semibold leading-[18px] text-[#6B7280]">
                Completed medications
              </Text>
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ expanded: completedExpanded }}
                className="min-h-[46px] flex-row items-center justify-between rounded-[14px] bg-white px-4"
                onPress={() => setCompletedExpanded((expanded) => !expanded)}
              >
                <Text className="text-sm font-semibold text-[#111827]">
                  {completedDoses.length}{' '}
                  {completedDoses.length === 1 ? 'dose' : 'doses'} completed
                  today
                </Text>
                <Text className="text-xl text-[#6B7280]">
                  {completedExpanded ? '⌃' : '⌄'}
                </Text>
              </Pressable>
              {completedExpanded && (
                <View className="gap-3 rounded-[14px] bg-white py-2">
                  {completedSchedules.map((schedule) => (
                    <View
                      key={schedule.medicationId}
                      className="px-4 py-2"
                    >
                      <Text className="text-base font-bold leading-[22px] text-[#111827]">
                        {schedule.name}
                      </Text>
                      <Text className="text-[13px] leading-[18px] text-[#6B7280]">
                        {schedule.dosage}
                      </Text>
                      {schedule.doses.map((dose) => (
                        <Text
                          key={dose.id}
                          className="mt-1.5 text-xs text-[#0D9488]"
                        >
                          ✓ {formatTime(dose.scheduled_time)} ·{' '}
                          {formatTimingLabel(dose.timing_label)}
                        </Text>
                      ))}
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}

          <Button
            className="mx-6 mt-3.5 h-12 rounded-[14px] bg-[#F0FDFA] shadow-none active:bg-[#F0FDFA]"
            onPress={() => router.push('/add-medication')}
            variant="ghost"
          >
            <Text className="text-sm font-semibold text-[#0D9488]">
              + Add medication
            </Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
