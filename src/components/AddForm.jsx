import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './common/Button';
import { useDispatch } from 'react-redux';
import { __addLetters } from 'redux/modules/letters';
import { v4 as uuid } from 'uuid';

export default function AddForm() {
    const dispatch = useDispatch();
    const nickname = localStorage.getItem('nickname');
    const userId = localStorage.getItem('userId');
    const avatar = localStorage.getItem('avatar');

    const [content, setContent] = useState('');
    const [member, setMember] = useState('민지');

    const onAddLetter = (event) => {
        event.preventDefault();
        //유효성검사
        if (!nickname || !content) return alert('닉네임과 내용은 필수값입니다.');

        //추가 로직
        const newLetter = {
            createdAt: new Date(),
            nickname,
            avatar,
            content,
            writedTo: member,
            id: uuid(),
            userId,
        };
        dispatch(__addLetters(newLetter));

        setContent('');
    };

    return (
        <Form onSubmit={onAddLetter}>
            <InputWrapper>
                <label>닉네임: </label>
                <p>{nickname}</p>
            </InputWrapper>
            <InputWrapper>
                <label>내용: </label>
                <textarea
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    placeholder="최대 100글자까지 작성할 수 있습니다. "
                    maxLength={100}
                />
            </InputWrapper>
            <SelectWrapper>
                <label>누구에게 보내실 건가요? </label>
                <select value={member} onChange={(event) => setMember(event.target.value)}>
                    <option>민지</option>
                    <option>하니</option>
                    <option>다니엘</option>
                    <option>해린</option>
                    <option>혜인</option>
                </select>
            </SelectWrapper>
            <Button text="팬레터 등록" />
        </Form>
    );
}

const Form = styled.form`
    background-color: #8dd2ef;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 500px;
    border-radius: 12px;
    margin: 20px 0;
`;

const InputWrapper = styled.div`
    display: flex;
    justify-content: space-between; /*양쪽으로 붙이기 */
    align-items: center;

    & label {
        width: 80px;
    }
    & p {
        width: 100%;
    }

    & input,
    textarea {
        width: 100%;
        padding: 12px;
    }

    & textarea {
        resize: none; /**사용자가 사이즈 수정 못하게 */
        height: 80px;
    }
`;

/*InputWrapper를 상속받아와서 오버라이드: 속성 덮어쓰기*/
const SelectWrapper = styled(InputWrapper)`
    justify-content: flex-start;

    & label {
        width: 200px;
    }
`;
