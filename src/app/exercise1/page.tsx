import { getExercise1 } from '@/services';
import { Exercise1View } from '@/views';

export default async function Exercise1() {
  const data = await getExercise1();
  return <Exercise1View data={data} />;
}
