export function cn(...args) {
  return args.filter(i => i).join(' ');
}