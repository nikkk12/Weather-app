type Props = {
  localtime: string;
};

export default function CurrentTime({ localtime }: Props) {
  if (!localtime) return null; 

    const dateObj = new Date(localtime);

  const formatted = dateObj.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }) + " - " + dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: '2-digit'
  });

  return <span>{formatted}</span>;
}


