import { useCallback } from 'react';
import axios from 'axios';

const useLikeHandler = (updateDataCallback: () => void) => {
    const token = sessionStorage.getItem('token');

    const addLike = useCallback(async (productId: number) => {
        if (!token) {
            console.log('Token not found');
            return;
        }

        try {
            const response = await axios.post("https://drugstoreproject.shop/likes", {
                'product_id': productId,
            }, {
                headers: {
                    "Token": token,
                    "Content-Type": 'application/json',
                },
            });

            if (response.status !== 200) {
                throw new Error('Error');
            } else {
                alert("좋아요 등록");
                updateDataCallback();
            }
        } catch (error) {
            console.log("오류 발생!!:", error);
        }
    }, [token, updateDataCallback]);

    const deleteLike = useCallback(async (productId: number) => {
        if (!token) {
            console.log('Token not found');
            return;
        }

        try {
            const response = await axios.delete("https://drugstoreproject.shop/likes", {
                data: {
                    'product_id': productId,
                },
                headers: {
                    "Token": token,
                    "Content-Type": 'application/json',
                },
            });

            if (response.status !== 200) {
                throw new Error('Error');
            } else {
                alert("좋아요 취소");
                updateDataCallback();
            }
        } catch (error) {
            console.log("오류 발생!!:", error);
        }
    }, [token, updateDataCallback]);

    return { addLike, deleteLike };
};

export default useLikeHandler;
