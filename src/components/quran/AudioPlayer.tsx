interface AudioPlayerProps {
  audioSrc: string;
}

export default function AudioPlayer({ audioSrc }: AudioPlayerProps) {
  return (
    <audio controls src={audioSrc} className="w-full rounded-md outline-none" />
  );
}
