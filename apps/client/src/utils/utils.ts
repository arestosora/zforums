import { format } from "date-fns";

const formatDate = (date: string) => {
    return format(new Date(date), 'MMM dd, yyyy');
};

export { formatDate };