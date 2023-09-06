interface IconProps {
  className?: string;
}

const StyledIcon = ({
  Icon,
  className,
}: {
  Icon: React.FC<IconProps>;
  className?: string;
}) => {
  return <Icon className={className} />;
};

export default StyledIcon;
