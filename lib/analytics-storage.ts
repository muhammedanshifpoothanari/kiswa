import dbConnect from '@/lib/mongodb';
import AnalyticsEvent, { IAnalyticsEvent } from '@/models/AnalyticsEvent';

export async function saveEvent(eventData: Partial<IAnalyticsEvent>): Promise<void> {
  try {
    await dbConnect();
    await AnalyticsEvent.create(eventData);
  } catch (error) {
    console.error("Failed to save analytics event to MongoDB:", error);
  }
}
