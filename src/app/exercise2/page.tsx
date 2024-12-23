import { getExercise2 } from '@/services';
import { Exercise2View } from '@/views';

export default async function Exercise2() {
  const data = await getExercise2();
  return <Exercise2View data={data} />;
}
